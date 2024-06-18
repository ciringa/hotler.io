import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { VerifyJWTAuthentication } from "../../midlewares/verifyUserAuth";
import { PrismaHotelRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaHotelRepositorie";
import { HotelRegisterUseCase } from "../../../Services/HotelRegister";
import { HotelNameIsAlreadyInUse } from "../../../Services/Error/RegisterErrors";
import { returnProfileUseCase } from "../../../Services/returnProfile";
import { PrismaUserRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaUserRepositorie";

export async function RegisterHotel(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/",{
        schema:{
            tags:["Hotel"],
            description:"Route used to create an hotel. Only possible if the logged user has an admin hole",
            body:z.object({
                Name:z.string(),
                Phone:z.string().optional(),
                Description:z.string().optional(),
                Rating:z.number().positive().optional(),
                Latitude:z.number(),
                Longitude:z.number(),
            }),
            response:{
                201:z.object({
                    Description:z.string()
                }),
                400:z.object({
                    Description:z.string()
                }),
                401:z.object({
                    Description:z.string()
                })
            }
        }, 
        preHandler:[VerifyJWTAuthentication]
    },async(req,res)=>{
        const data = req.body
        const loggedId = req.user.sub
        const repositorie = new PrismaHotelRepositorie()
        const main = new HotelRegisterUseCase(repositorie)
        
        const checkUserExistence = await new returnProfileUseCase(new PrismaUserRepositorie()).execute(loggedId)

        try{
            if(checkUserExistence.Role == "ADMIN"){            
                const CreatedHotel = await main.execute(data)
                res.status(201).send({
                    Description:"successfully created an hotel"
                })
             }else{
                res.status(401).send({
                    Description:"Unauthorized. Only users with ADMIN role are able to create hotels"
                })
             }
        }catch(err){
            if(err instanceof HotelNameIsAlreadyInUse){
                res.status(400).send({
                    Description:"The specified Hotel Name is already in use. Please provide a new one "
                })
            }
        }

    })
}