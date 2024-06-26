import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { ReturnValidatedCheckInHotelHistoryUseCase } from "../../../Services/RetunHotelValidatedCheckIns";
import { PrismaHotelRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaHotelRepositorie";
import { PrismaCheckInRepositorie } from "../../../repositorie/PrismaRepositorie/PrismaCheckInRepositorie";
import { HotelIdDoesNotExistsError } from "../../../Services/Error/NotFoundError";


export async function HotelValidatedCheckIns(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/:Hotelid/:Page",{
        schema:{
            tags:["Hotel"],
            description:"Returns the list of validated checkIns in a hotel by recieving the hotelID and the page index ",
            params:z.object({
                Hotelid:z.string().uuid(),
                Page:z.string()
            }),
            response:{
                200:z.object({
                    CheckInlist:z.array(z.object({
                        Id: z.string(),
                        UserId: z.string().uuid(),
                        HotelId: z.string().uuid(),
                        createdAt: z.date(),
                        validatedAt: z.date().nullable()
                    })),
                    Amount:z.number()
                }),
                404:z.object({
                    Description:z.string()
                })
            }
        }
    },async(req,res)=>{
        const {Page,Hotelid} = req.params
        const Main = new ReturnValidatedCheckInHotelHistoryUseCase(new PrismaHotelRepositorie(), new PrismaCheckInRepositorie())
        try{
            const SearchQuery = await Main.execute(Hotelid,Number(Page))

            res.status(200).send(SearchQuery)
        }catch(err){    
            if(err instanceof HotelIdDoesNotExistsError){
                res.status(404).send({
                    Description:"Can't find the specified hotel"
                })
            }
        }
    })
}