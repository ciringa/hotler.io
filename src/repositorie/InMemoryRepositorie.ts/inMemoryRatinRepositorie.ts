import { CheckIn, Prisma, Rating, User, permission } from "@prisma/client";
import { randomUUID } from "crypto";


export class inMemoryRatingRepositorie{
    public list:Rating[] = []

    async create(data:Prisma.RatingUncheckedCreateInput){
        const _data = {
            HotelId: String(data.HotelId),
            UserId: String(data.HotelId),
            Value:data.Value,
            Description:String(data.Description),
            Id:Number(data.Id),
            createdAt: new Date()
        }
        this.list.push(_data)
        return this.list[this.list.length-1]
    }
  async findById(Id:number){
    const returnedOne = this.list.find(item => item.Id == Id)
    return returnedOne
  }

  async ReturnByUsers(uid:string){
    const searchList = this.list.filter(item => item.UserId == uid)
    return searchList
  }
  async ReturnByHotels(hid:string){
    const searchList = this.list.filter(item => item.HotelId == hid)
    return searchList
  }
}