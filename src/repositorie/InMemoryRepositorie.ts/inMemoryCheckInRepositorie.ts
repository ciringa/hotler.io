import { CheckIn, Prisma, User, permission } from "@prisma/client";


export class inMemoryCheckInRepositorie{
    public list:CheckIn[] = []

    async create(data:Prisma.CheckInUncheckedCreateInput){
        const _data = {
            HotelId:String(data.HotelId),
            UserId:String(data.UserId),
            createdAt:new Date(),
            Id:String(data.Id),
            validatedAt:null
        }
        this.list.push(_data)
        return this.list[this.list.length-1]
    }
  async findById(Id:string){
    const returnedOne = this.list.find(item => item.Id == Id)
    return returnedOne
  }

  async ReturnByUsers(uid:string){
    const searchList = this.list.filter(item => item.UserId == uid)
    return searchList
  }
}