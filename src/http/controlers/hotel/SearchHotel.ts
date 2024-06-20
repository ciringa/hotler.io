import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { VerifyJWTAuthentication } from "../../midlewares/verifyUserAuth";
import z, { number, string } from "zod";
import { ReturnHotelListByQueryUseCase } from "../../../Services/SearchHotel";
import { PrismaHotelRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaHotelRepositorie";

export async function SearchHotelByQuery(app:FastifyInstance) {
    app.addHook("preHandler",async(req,res)=>{
        return await VerifyJWTAuthentication(req,res)
    })
    app.withTypeProvider<ZodTypeProvider>().get("/:Query/:Page",{
        schema:{
            params:z.object({
                Query:z.string(),
                Page:z.string()
            }),
            tags:["Hotel"],
            description:"Search a hotel by recieving a query and a page indes parameter. Search throung the database to find something that contains the query and return this info paginated with 20 itens per page, alternating page index means changing the page of elements",
            response:{
                200:z.object({
                    ReturnObjectList:z.array(z.object({
                        Id:z.string(),
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