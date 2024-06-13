import { CheckIn, Prisma } from "@prisma/client";
import { error } from "console";
import { HotelIdDoesNotExistsError, UserIdDoesNotExistsError } from "./Error/NotFoundError";


type CheckInUseCaseRequestParams = Prisma.CheckInUncheckedCreateInput

interface CheckInUseCaseResponse {
    Description:string,
    CreatedCheckIn:CheckIn
}


export class CheckInUseCase{
    constructor(private checkInRepositorie: any, private UserRepositorie:any, private HotelRepositorie:any){
    }

    async execute(data:CheckInUseCaseRequestParams): Promise<CheckInUseCaseResponse>{
        const checkIfTheInformedUserExists = await this.UserRepositorie.findById(data.UserId)
        if(!checkIfTheInformedUserExists){
            throw new UserIdDoesNotExistsError()
        }
        const checkInIfTheHotelExits = await this.HotelRepositorie.findById(data.HotelId)
        if(!checkInIfTheHotelExits){
            throw new HotelIdDoesNotExistsError()
        }

        const CreatedCheckIn = await this.checkInRepositorie.create(data)

        return{
            CreatedCheckIn,
            Description:"successfully checkedIn"
        }
    }
}