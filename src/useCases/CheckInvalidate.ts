import { CheckIn } from "@prisma/client"
import { CheckInAlreadyValidated } from "./Error/CommonErrors"
import { CheckInIdDoesNotExists } from "./Error/NotFoundError"

interface ValidateCheckInUseCaseResponse {
    validateCheckIn:CheckIn
}
export class ValidateCheckInUseCase {
    constructor (private CheckInRepositorie:any){
    }

    async execute(CheckInId:string):Promise<ValidateCheckInUseCaseResponse>{
        const checkInExists = this.CheckInRepositorie.findById(CheckInId)
        if(!checkInExists){
            throw new CheckInIdDoesNotExists()
        }
        const validateCheckIn = this.CheckInRepositorie.ValidateCheckIn(CheckInId)
        if(!validateCheckIn){
            throw new CheckInAlreadyValidated()
        }

        return {
            validateCheckIn,
        }
    }
}