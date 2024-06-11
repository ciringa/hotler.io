import { Prisma, User, permission } from "@prisma/client";

export class inMemoryUserRepositorie{
    public list:User[] = []

    async create(data:Prisma.UserCreateInput){
        const _data = {
           Id:String(data.Id),
           Email: String(data.Email),
           Password: data.Password,
           Role:permission.USER,
           BirthDay:null,
           Name: data.Name,
           Description:null,

        }
        this.list.push(_data)
        return this.list[this.list.length-1]
    }
  async findById(Id:string){
    const returnedOne = this.list.find(item => item.Id == Id)
    return returnedOne
  }
  async findByEmail(Email:string){
    const returnSingle = this.list.find(item => item.Email == Email)
    return returnSingle
  }
}