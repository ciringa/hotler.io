import { FastifyInstance } from "fastify";
import { VerifyJWTAuthentication } from "../../midlewares/verifyUserAuth";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { ValidateCheckInUseCase } from "../../../Services/CheckInvalidate";
import { PrismaCheckInRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaCheckInRepositorie";
import { returnProfileUseCase } from "../../../Services/returnProfile";
import { PrismaUserRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaUserRepositorie";
import { CheckInIdDoesNotExists } from "../../../Services/Error/NotFoundError";
import { CheckInAlreadyValidated, CheckInMustBeValidatedInTheSameDay } from "../../../Services/Error/CommonErrors";

export async function CheckInValidate(app:FastifyInstance) {
    app.addHook("preHandler",async(req,res)=>{
        return await VerifyJWTAuthentication(req,res)
    })
    app.withTypeProvider<ZodTypeProvider>().patch("/:CheckInId",{
        schema:{
            tags:["CheckIn"],
            description:"",
            params:z.object({
                CheckInId:z.string()
            }),
            response:{
                401:z.object({
                    Description:z.string()
                }),
                404:z.object({
                    Description:z.string()
                }),
                200:z.object({
                    Description:z.string(),
                    response: z.object({
                        Id: z.string(),
                        UserId: z.string().uuid(),
                        HotelId: z.string().uuid(),
                        createdAt:z.date(),
                        validatedAt:z.date().nullable(),  
                    })
                })
            }
        }
    },async(req,res)=>{
        const {CheckInId} = req.params
        const CheckUserLoggedTokenHasEnoughtPrivileges = await (new returnProfileUseCase(new PrismaUserRepositorie).execute(req.user.sub))
        if(CheckUserLoggedTokenHasEnoughtPrivileges.Role == "ADMIN"){
            const main = new ValidateCheckInUseCase(new PrismaCheckInRepositorie)
            try{
                const checkInvalidate = await main.execute(CheckInId)
                res.status(200).send({
                    Description:"CheckIn successfully validated by an admin user",
                    response:checkInvalidate.validateCheckIn,
                })
            }catch(err){
                if(err instanceof CheckInIdDoesNotExists){
                    res.status(404).send({
                        Description:"Check in does not exists"
                    })
                }
                if(err instanceof CheckInAlreadyValidated){
                    res.status(401).send({
                        Description:"Check is already validated"
                    })
                }
                if(err instanceof CheckInMustBeValidatedInTheSameDay){
                    res.status(401).send({
                        Description:"Check must to be validated at the same day that is created"
                    })
                }
            }
        }else{
            res.status(401).send({
                Description:"Unauthorized"
            })
        }
    })
}