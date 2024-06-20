import { CheckIn, Prisma } from "@prisma/client";
import { error } from "console";
import { HotelIdDoesNotExistsError, UserIdDoesNotExistsError } from "./Error/NotFoundError";
import { AlreadyDidCheckInToday, UserIsToFarFromTheHotelToCheckIn } from "./Error/CommonErrors";
import { ReturnDistanceByProvidedData } from "../utils/returnGeoDIstance";


interface CheckInUseCaseRequestParams{
    data: Prisma.CheckInUncheckedCreateInput,
    UserLatitude:number,
    UserLongitude:number
}

interface CheckInUseCaseResponse {
    Description:string,
    CreatedCheckIn:CheckIn
}


export class CheckInUseCase{
    constructor(private checkInRepositorie: any, private UserRepositorie:any, private HotelRepositorie:any){
    }
        async execute({data,UserLongitude,UserLatitude}:CheckInUseCaseRequestParams): Promise<CheckInUseCaseResponse>{
        const checkIfTheInformedUserExists = await this.UserRepositorie.findById(data.UserId)
        if(!checkIfTheInformedUserExists){
            throw new UserIdDoesNotExistsError()
        }
        const checkInIfTheHotelExits = await this.HotelRepositorie.findById(data.HotelId)
        if(!checkInIfTheHotelExits){
            throw new HotelIdDoesNotExistsError()
        }
        const checkIfTheUserHasAlreadyCheckedInToday = await this.checkInRepositorie.AlreadyDidCheckInToday(data.UserId)
        if(checkIfTheUserHasAlreadyCheckedInToday){
            throw new AlreadyDidCheckInToday() 
        }
        const {Latitude,Longitude} = checkInIfTheHotelExits
        const RecieveTheUserDistanceFromTheHotel = ReturnDistanceByProvidedData(Latitude,Longitude,UserLatitude,UserLongitude)
        if(RecieveTheUserDistanceFromTheHotel>=2){
            throw new UserIsToFarFromTheHotelToCheckIn
        }
        const CreatedCheckIn = await this.checkInRepositorie.create(data)

        return{
            CreatedCheckIn,
            Description:"successfully checkedIn"
        }
    }
}