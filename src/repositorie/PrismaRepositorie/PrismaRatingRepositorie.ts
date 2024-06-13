import { Prisma } from "@prisma/client"
import { prisma } from "../../lib/prisma"


export class PrismaRatingRepositorie{


    async create(data:Prisma.RatingUncheckedCreateInput){
        const returnObject = await prisma.rating.create({
            data,
        })
        return returnObject
    }
    async findById(Id:number){
    const returnedOne = await prisma.rating.findUnique({
        where:{
            Id
        }
    })
    return returnedOne
  }
    async ReturnByUsers(uid:string,Page:number){
    const searchList = await prisma.rating.findMany({
        where:{
            UserId:uid
        }
    })
    return searchList
  }
  async ReturnByHotel(hid:string,Page:number){
    const searchList = await prisma.rating.findMany({
        where:{
            HotelId:hid
        }
    })
    return searchList
  }
  async ReturnHotelRating(hid:string){
    let media = 0
    const searchList = await prisma.rating.findMany({
        where:{
            HotelId:hid
        }
    })
    searchList.forEach(Element=>{
      media = media + Element.Value
    })
    media = media/searchList.length
    return media
  }
}