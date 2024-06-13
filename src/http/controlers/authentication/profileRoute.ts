import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { PrismaUserRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaUserRepositorie";
import { returnProfileUseCase } from "../../../Services/returnProfile";
import { VerifyJWTAuthentication } from "../../midlewares/verifyUserAuth";


export async function ReturnProfile(app:FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get("/",{
        schema:{

        },
        preHandler:[VerifyJWTAuthentication]
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

        }
    })
}