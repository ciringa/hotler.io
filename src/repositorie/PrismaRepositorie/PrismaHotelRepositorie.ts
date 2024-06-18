import { Hotel, Prisma, User, permission } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class PrismaHotelRepositorie{
    async create(data:Prisma.HotelCreateInput){
        const returnOne = await prisma.hotel.create({
            data
        })
        return returnOne
    }
  async findById(Id:string){
    const returnedOne = await prisma.hotel.findUnique({
        where:{
            Id
        }
    })
    return returnedOne
  }
  async findByName(Name:string){
    const returnSingle = await prisma.hotel.findUnique({
        where:{
            Name
        }
    })
    return returnSingle
  }
  async returnHotelList(Page:number){
    return (await prisma.hotel.findMany({
        skip:(Page-1)*20,
        take:Page*20
    }))
  }
  async searchHotelsByName(Query:string, Page:number){
    return await prisma.hotel.findMany({
        where:{
            Name:{
                contains:Query
            }
        },
        skip:(Page-1)*20,
        take:Page*20
    })
  }

}