import { UserIdDoesNotExistsError } from "./Error/NotFoundError"

export class ReturnCheckInUserHistoryUseCase {
    constructor(private userRepositorie:any, private CheckInRepositorie:any){
    }

    async execute(UserId:string, Page:number){
        const doesTheUserExists = await this.userRepositorie.findById(UserId)
        if(!doesTheUserExists){
            throw new UserIdDoesNotExistsError()
        }
        const returnCheckInListOfAnUser = await this.CheckInRepositorie.ReturnByUsers(UserId,Page)

        return {
            CheckInlist:returnCheckInListOfAnUser.searchList,
            Amount:returnCheckInListOfAnUser.Amount
        }
    }
}