import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { PrismaUserRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaUserRepositorie";
import { returnProfileUseCase } from "../../../Services/returnProfile";
import { VerifyJWTAuthentication } from "../../midlewares/verifyUserAuth";
import { UserIdDoesNotExistsError } from "../../../Services/Error/NotFoundError";
import z, { string } from "zod";


export async function ReturnProfile(app:FastifyInstance){
    app.addHook("preHandler",async(req,res)=>{
        return await VerifyJWTAuthentication(req,res)
    })
    app.withTypeProvider<ZodTypeProvider>().get("/",{
        schema:{
            tags:["Auth"],
            description:"Return the user data by recieving an jwt that contains the specified user id",

            response:{
                200:z.object({
                    Description:z.string(),
                    returnProfile:z.object({
                        Id: z.string().uuid(),
                        Email: z.string().email(),
                        Password: z.string(),
                        Role:z.enum(["ADMIN","USER"]),
                        BirthDay:z.date().nullable(),
                        Name:z.string(),
                        Description:z.string().nullable(),
                    })
                }),
                400:z.object({
                    Description:z.string()
                })
            }
        },
    },async (req,res)=>{
        const userRepositorie = new PrismaUserRepositorie()
        const data = req.user.sub
        const main = new returnProfileUseCase(userRepositorie)
        try{
            const returnProfile = await main.execute(data)
            res.status(200).send({
                Description:"successfully returned your profile informations",
                returnProfile
            })
        }catch(err){
            if(err instanceof UserIdDoesNotExistsError){
                res.status(400).send({
                    Description:"user Id does not exists"
                })
            }
        }
    })
}