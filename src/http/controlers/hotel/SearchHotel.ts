import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { VerifyJWTAuthentication } from "../../midlewares/verifyUserAuth";
import z, { number, string } from "zod";
import { ReturnHotelListByQueryUseCase } from "../../../Services/SearchHotel";
import { PrismaHotelRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaHotelRepositorie";

export async function SearchHotelByQuery(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/:Query/:Page",{
        schema:{
            params:z.object({
                Query:z.string(),
                Page:z.string()
            }),
            response:{
                200:z.object({
                    ReturnObjectList:z.array(z.object({
                        Name:z.string(),
                        Phone:z.string().nullable(),
                        Description:z.string().nullable(),
                        Rating:z.number().positive().nullable(),
                        Latitude:z.number(),
                        Longitude:z.number(),
                    }).nullable())
                })
            }
        },
        preHandler:[VerifyJWTAuthentication]
    },async (req,res)=>{
        const {Query, Page} = req.params
        const Main = new ReturnHotelListByQueryUseCase(new PrismaHotelRepositorie)
        try{
            console.log(Query,Page)
            const recieveSearch = await Main.execute({
                Query, 
                Page:Number(Page) 
            })

            res.status(200).send(recieveSearch)
        }catch(err){

        }
    })
}