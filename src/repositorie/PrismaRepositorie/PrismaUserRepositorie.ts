import { Prisma} from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class PrismaUserRepositorie{
    async create(data:Prisma.UserCreateInput){
        const returnObject = await prisma.user.create({
            data,
        })
        return returnObject
    }
  async findById(Id:string){
    const returnedOne = await prisma.user.findUnique({
        where:{
            Id,
        }
    })
    return returnedOne
  }
  async findByEmail(Email:string){
    const returnSingle = await prisma.user.findUnique({
        where:{
            Email,
        }
    })
    return returnSingle
  }
}