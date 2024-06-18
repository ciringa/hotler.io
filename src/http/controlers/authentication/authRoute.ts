import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaUserRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaUserRepositorie";
import { UserAuthenticateUseCase } from "../../../Services/Authenticate";
import { InvalidAuthenticationKeys, UserEmailDoesNotExists } from "../../../Services/Error/authenticateErrors";

export async function AuthenticateRoute(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/",{
        schema:{
            tags:["Auth"],
            description:"Login route. returns the jwt token with the user ID if the Email and Password are valid",
            body:z.object({
                Password:z.string(),
                Email:z.string().email()
            }),
            response:{
                200:z.object({
                    Description:z.string(),
                    token:z.string()
                }),
                404:z.object({
                    Description:z.string()
                }),
                401:z.object({
                    Description:z.string()
                })
            }
        }
    },async(req,res)=>{
        const {Password,Email} = req.body
        const userRepositorie = new PrismaUserRepositorie()
        const Main = new UserAuthenticateUseCase(userRepositorie)
        try{
            const returnIdFromValidation = await Main.execute({
                Email,Password
            })
            const token = await res.jwtSign({},{
                 sign:{
                    sub:returnIdFromValidation
                 }
             })
            res.status(200).send({
                Description:"successfully loggedIn",
                token
            })
        }catch(err){
            if(err instanceof UserEmailDoesNotExists){
                res.status(404).send({
                    Description:"The specified User Email does Not exists"
                })
            }
            if(err instanceof InvalidAuthenticationKeys){
                res.status(401).send({
                    Description:"Wrong Email or Password"
                })
            }
        }
    })
}