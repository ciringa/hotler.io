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

  async ReturnByUsers(uid:string,Page:number){
    const searchList = this.list.filter(item => item.UserId == uid).slice((Page-1)*20,Page*20)
    return {
      searchList,
      Amount:searchList.length
    }
  }

  async ReturnValidatedByHotel(HotelId:string,Page:number){
    const searchList = this.list.filter(item => item.HotelId == HotelId && item.validatedAt != null).slice((Page-1)*20,Page*20)
    // console.log(this.list)
    return {
      searchList,
      Amount:searchList.length
    }
  }
  async ValidateCheckIn(CheckIn:string){
    const searchList = this.list.findIndex(item => item.Id == CheckIn)
    if(this.list[searchList].validatedAt==null){
      this.list[searchList].validatedAt = new Date()
      return this.list[searchList]
    }
    return null
  }
  async AlreadyDidCheckInToday(UserId:string){
    const searchList = this.list.filter(item => item.UserId == UserId);
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