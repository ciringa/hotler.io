import { UserIdDoesNotExistsError } from "./Error/NotFoundError"

export class returnProfileUseCase{
    constructor (private userRepositorie:any){

    }
    async execute(Id:string){
        const returnProfile = await this.userRepositorie.findById(Id)
        if(!returnProfile){
            throw new UserIdDoesNotExistsError
        }

        return returnProfile
    }
}