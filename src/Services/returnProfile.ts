
import { UserIdDoesNotExistsError } from "./Error/NotFoundError"
import { User } from "@prisma/client"

export class returnProfileUseCase{
    constructor (private userRepositorie:any){

    }
    async execute(Id:string):Promise<User>{
        const returnProfile = await this.userRepositorie.findById(Id)
        if(!returnProfile){
            throw new UserIdDoesNotExistsError
        }

        return returnProfile
    }
}