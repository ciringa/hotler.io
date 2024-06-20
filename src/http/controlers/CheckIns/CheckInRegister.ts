import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { CheckInUseCase } from "../../../Services/CheckIn";
import { PrismaCheckInRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaCheckInRepositorie";
import { PrismaUserRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaUserRepositorie";
import { PrismaHotelRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaHotelRepositorie";
import { HotelIdDoesNotExistsError, UserIdDoesNotExistsError } from "../../../Services/Error/NotFoundError";
import { AlreadyDidCheckInToday, UserIsToFarFromTheHotelToCheckIn } from "../../../Services/Error/CommonErrors";
import { VerifyJWTAuthentication } from "../../midlewares/verifyUserAuth";

export async function RegisterCheckIn(app:FastifyInstance) {
    app.addHook("preHandler",async(req,res)=>{
        return await VerifyJWTAuthentication(req,res)
    })
    app.withTypeProvider<ZodTypeProvider>().post("/:uLat/:uLon",{
        schema:{
            tags:["CheckIn"],
            description:"create a checkIn. recieves an user latitude and longitude as params both used to verify the position of the user in comparisson with the hotel position, if the user is 2km far from the hotel the checkIn won't be created",
            params:z.object({
                uLat:z.string(),
                uLon:z.string()
            }),
            body:z.object({
                HotelId:z.string().uuid(),
                UserId:z.string().uuid(),
            }),
            response:{
                404:z.object({
                    Description:z.string()
                }),
                201:z.object({
                    Description:z.string(),
                    response:z.object({
                        Id: z.string(),
                        UserId: z.string().uuid(),
                        HotelId: z.string().uuid(),
                        createdAt:z.date(),
                        validatedAt:z.date().nullable(),  
                    })
                }),
                401:z.object({
                    Description:z.string()
                })
            }
        },
    },async(req,res)=>{
        const data = req.body   
        const {uLat,uLon} = req.params
        const UserLatitude = Number(uLat)
        const UserLongitude = Number(uLon)        
        const main = new CheckInUseCase(new PrismaCheckInRepositorie, new PrismaUserRepositorie,new PrismaHotelRepositorie)
        try{
            const CheckIn = await main.execute({
                data,
                UserLatitude,
                UserLongitude
            })
            res.status(201).send({
                Description:"successfully checkedIn",
                response:CheckIn.CreatedCheckIn,
            })
        }catch(err){
            if(err instanceof UserIdDoesNotExistsError){
                res.status(404).send({
                    Description:"can't find the provided user id"
                })
            }
            if(err instanceof HotelIdDoesNotExistsError){
                res.status(404).send({
                    Description:"can't find the provided hotel id"
                })
            }
            if(err instanceof AlreadyDidCheckInToday){
                res.status(401).send({
                    Description:"can't checkIn twice in the same day"
                })
            }
            if(err instanceof UserIsToFarFromTheHotelToCheckIn){
                res.status(401).send({
                    Description:"User needs to be at least 2 km closer to the hotel"
                })
            }
        }
    })
}