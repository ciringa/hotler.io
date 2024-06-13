import { Prisma, User } from "@prisma/client";
import {hash} from "bcryptjs";
import { PASSWORD_HASH } from "../env/env";
import { EmailAdressAlreadyInUseError } from "./Error/RegisterErrors";

type RegisterUserRequestParams = Prisma.UserCreateInput
interface RegisterUserResponse {
    createObject:User
}


export class RegisterUserUseCase{
    constructor(private userRepositorie:any){

    }

    async execute(data:RegisterUserRequestParams): Promise<RegisterUserResponse>{
        const _data:RegisterUserRequestParams = {
            Email:data.Email,
            Name:data.Name,
            Description:data.Description,
            Role:data.Role,
            BirthDay:data.BirthDay,
            Id:data.Id,
            Password: await hash(data.Password,Number(PASSWORD_HASH))

        }   

        const verifyIfTheEmailIsAlreadyInUse = await this.userRepositorie.findByEmail(data.Email)

        if(verifyIfTheEmailIsAlreadyInUse){
            throw new EmailAdressAlreadyInUseError()
        }else{
            const createObject = await this.userRepositorie.create(_data)
            return {
                createObject
            }
        }
    }
}