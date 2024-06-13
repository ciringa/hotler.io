import { CheckIn } from "@prisma/client"
import { HotelIdDoesNotExistsError, UserIdDoesNotExistsError } from "./Error/NotFoundError"

interface ReturnValidatedCheckInHotelHistoryResponse {
    CheckInlist: CheckIn[],
    Amount:number
}

export class ReturnValidatedCheckInHotelHistoryUseCase {
    constructor(private hotelRepositorie:any, private CheckInRepositorie:any){
    }

    async execute(HotelId:string, Page:number): Promise<ReturnValidatedCheckInHotelHistoryResponse>{
        const doesTheHotelExists = await this.hotelRepositorie.findById(HotelId)
        if(!doesTheHotelExists){
            throw new HotelIdDoesNotExistsError()
        }
        const returnCheckInListOfAnHotel= await this.CheckInRepositorie.ReturnValidatedByHotel(HotelId,Page)
        // console.log(returnCheckInListOfAnHotel)
        return {
            CheckInlist:returnCheckInListOfAnHotel.searchList,
            Amount:returnCheckInListOfAnHotel.Amount
        }
    }
}