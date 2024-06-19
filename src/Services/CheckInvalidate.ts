import { CheckIn } from "@prisma/client"
import { CheckInAlreadyValidated, CheckInMustBeValidatedInTheSameDay } from "./Error/CommonErrors"
import { CheckInIdDoesNotExists } from "./Error/NotFoundError"

interface ValidateCheckInUseCaseResponse {
    validateCheckIn:CheckIn
}
export class ValidateCheckInUseCase {
    constructor (private CheckInRepositorie:any){
    }

    async execute(CheckInId:string):Promise<ValidateCheckInUseCaseResponse>{
        const checkInExists = await this.CheckInRepositorie.findById(CheckInId)
        if(!checkInExists){
            throw new CheckInIdDoesNotExists()
        }

        const day = checkInExists.createdAt.getDate()
        const today = new Date().getDate()

        if(day == today){
            if(checkInExists.validatedAt == null){
                const validateCheckIn = this.CheckInRepositorie.ValidateCheckIn(CheckInId)
                return {
                    validateCheckIn,
                }
            }else{
                throw new CheckInAlreadyValidated
            }

        }else{
            throw new CheckInMustBeValidatedInTheSameDay
        }
    }
}