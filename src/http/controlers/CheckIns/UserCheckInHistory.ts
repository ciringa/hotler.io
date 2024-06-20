import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z, { number } from "zod";
import { CheckInUseCase } from "../../../Services/CheckIn";
import { PrismaCheckInRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaCheckInRepositorie";
import { PrismaUserRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaUserRepositorie";
import { PrismaHotelRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaHotelRepositorie";
import { HotelIdDoesNotExistsError, UserIdDoesNotExistsError } from "../../../Services/Error/NotFoundError";
import { AlreadyDidCheckInToday, UserIsToFarFromTheHotelToCheckIn } from "../../../Services/Error/CommonErrors";
import { VerifyJWTAuthentication } from "../../midlewares/verifyUserAuth";
import { ReturnCheckInUserHistoryUseCase } from "../../../Services/ReturnUserCheckInHistory";

export async function ReturnUserCheckInHistory(app:FastifyInstance) {
    app.addHook("preHandler",async(req,res)=>{
        return await VerifyJWTAuthentication(req,res)
    })
    app.withTypeProvider<ZodTypeProvider>().get("/:UserId/:Page",{
        schema:{
            tags:["CheckIn"],
            description:"create a checkIn. recieves an user latitude and longitude as params both used to verify the position of the user in comparisson with the hotel position, if the user is 2km far from the hotel the checkIn won't be created",
            params:z.object({
                UserId:z.string(),
                Page:z.string()
            }),
            response:{
                200:z.object({
                    Description:z.string(),
                    Amount:z.number(),
                    List:z.array(z.object({
                        Id: z.string(),
                        UserId: z.string().uuid(),
                        HotelId: z.string().uuid(),
                        createdAt:z.date(),
                        validatedAt:z.date().nullable(),  
                    }))
                }),
                404:z.object({
                    Description:z.string()
                })
            }
        },
    },async(req,res)=>{
        var{UserId,Page} = req.params
        
        const main = new ReturnCheckInUserHistoryUseCase(new PrismaUserRepositorie,new PrismaCheckInRepositorie)
        try{
            const CheckIn = await main.execute(UserId,Number(Page))
            res.status(201).send({
                Description:"successfully returned CheckInHistory",
                Amount:CheckIn.Amount,
                List:CheckIn.CheckInlist
            })
        }catch(err){
            if(err instanceof UserIdDoesNotExistsError){
                res.status(404).send({
                    Description:"can't find the provided user id"
                })
            }
        }
    })
}