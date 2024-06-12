import { CheckIn, Prisma, Rating, User, permission } from "@prisma/client";
import { randomUUID } from "crypto";


export class inMemoryRatingRepositorie{
    public list:Rating[] = []

    async create(data:Prisma.RatingUncheckedCreateInput){
        const _data = {
            HotelId: String(data.HotelId),
            UserId: String(data.UserId),
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

  async ReturnByUsers(uid:string,Page:number){
    const searchList = this.list.filter(item => item.UserId == uid).slice((Page-1)*20,Page*20)
    return searchList
  }
  async ReturnByHotel(hid:string,Page:number){
    const searchList = this.list.filter(item => item.HotelId == hid).slice((Page-1)*20,Page*20)
    return searchList
  }
  async ReturnHotelRating(hid:string){
    let media = 0
    const searchList = this.list.filter(item => item.HotelId == hid)
    searchList.forEach(Element=>{
      media = media + Element.Value
    })
    media = media/searchList.length
    return media
  }
}