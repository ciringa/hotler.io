import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaUserRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaUserRepositorie";
import { RegisterUserUseCase } from "../../../Services/RegisterUser";
import { EmailAdressAlreadyInUseError } from "../../../Services/Error/RegisterErrors";

export async function RegisterUserRoute(app:FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post("/",{
        schema:{
            body:z.object({
                Email:z.string().email(),
                Name:z.string(),
                Password:z.string()
            })
        }
    },async(req,res)=>{
        const data = req.body
        const userRepositorie = new PrismaUserRepositorie()
        const SUT = new RegisterUserUseCase(userRepositorie)
        try{
            const createObject = await SUT.execute(data)
            res.status(201).send(createObject)
        }catch(err){
            if(err instanceof EmailAdressAlreadyInUseError){
                res.status(400).send({
                    Description:"this Email Adress is already in use"
                })
            }
        }

    })
}