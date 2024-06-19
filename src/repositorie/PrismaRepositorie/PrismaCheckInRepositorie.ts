import { Prisma} from "@prisma/client";

import { prisma } from "../../lib/prisma";


export class PrismaCheckInRepositorie{


    async create(data:Prisma.CheckInUncheckedCreateInput){
        const returnObject = await prisma.checkIn.create({
            data,
        })
        return returnObject
    }
  async findById(Id:string){
    const returnedOne = await prisma.checkIn.findUnique({
        where:{
            Id
        }
    })
    return returnedOne
  }

  async ReturnByUsers(uid:string,Page:number){
    const searchList = await prisma.checkIn.findMany({
        where:{
            UserId:uid
        },
        take:Page*20,
        skip:(Page-1)*20
    })
    return {
      searchList,
      Amount:searchList.length
    }
  }

  async ReturnValidatedByHotel(HotelId:string,Page:number){
    const searchList = await prisma.checkIn.findMany({
        where:{
            HotelId,
        },
        take:Page*20,
        skip:(Page-1)*20
    })
    searchList.filter(item => item.validatedAt != null)
    return {
      searchList,
      Amount:searchList.length
    }
  }
  
  async ValidateCheckIn(CheckIn:string){
    const searchList = await prisma.checkIn.update({
        where:{
            Id:CheckIn
        },
        data:{
            validatedAt:new Date()
        }
    })
    return searchList
  }

  async AlreadyDidCheckInToday(UserId:string){
    const searchList = await prisma.checkIn.findMany({
      where:{
          UserId:UserId,
      },
    })
    let today = new Date();
    // Converter a data de hoje para apenas ano, mês e dia
    today.setHours(0, 0, 0, 0);
    
    for (let element of searchList) {
      let createdAt = new Date(element.createdAt);
      
      // Converter createdAt para apenas ano, mês e dia
      createdAt.setHours(0, 0, 0, 0);
      
      if (createdAt.getTime() === today.getTime()) {
        return true;
      }
    }
    
    return false;
    }
}