import { Hotel, Prisma, User, permission } from "@prisma/client";

export class inMemoryHotelRepositorie{
    public list:Hotel[] = []

    async create(data:Prisma.HotelCreateInput){
        const _data = {
            Id:String(data.Id),
            Name:data.Name,
            Latitude:data.Latitude,
            Longitude:data.Longitude,
            Phone:String(data.Phone),
            Description:String(data.Description),
            Rating:Number(data.Rating)
        }
        this.list.push(_data)
        return this.list[this.list.length-1]
    }
  async findById(Id:string){
    const returnedOne = this.list.find(item => item.Id == Id)
    return returnedOne
  }
  async findByName(Name:string){
    const returnSingle = this.list.find(item => item.Name == Name)
    return returnSingle
  }
  async returnHotelList(Page:number){
    return this.list.slice((Page-1)*20,Page*20)
  }
  async searchHotelsByName(Query:string, Page:number){
    return this.list.filter(item => item.Name.includes(Query)).slice((Page-1)*20,Page*20)
  }

}