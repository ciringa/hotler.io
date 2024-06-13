import { Rating } from "@prisma/client"
import { UserIdDoesNotExistsError } from "./Error/NotFoundError"

interface ReturnUserRatingsUseCaseResponseParams {
    returnUserRatingList: Rating[]
}

export class ReturnUserRatingsUseCase {
    constructor (private userRepositorie:any , private ratingsRepositorie:any){
    }
    async execute(UserId:string, Page:number): Promise<ReturnUserRatingsUseCaseResponseParams>{
        const doesTheUserExists = await this.userRepositorie.findById(UserId)
        if(!doesTheUserExists){
            throw new UserIdDoesNotExistsError()
        }

        const returnUserRatingList = await this.ratingsRepositorie.ReturnByUsers(UserId,Page)
        //console.log(returnUserRatingList)
        return {
            returnUserRatingList
        }
    }
}