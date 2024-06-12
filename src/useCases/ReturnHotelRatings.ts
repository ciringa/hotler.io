import { Rating } from "@prisma/client"
import { HotelIdDoesNotExistsError } from "./Error/NotFoundError"

interface ReturnHotelRatingsUseCaseResponse {
    ReturnHotelRatings: Rating[]
    ReturnHotelNote: number
}

export class ReturnHotelRatingsUseCase {
    constructor (private hotelRepositorie:any , private ratingsRepositorie:any){
    }
    async execute(HotelId:string, Page:number): Promise<ReturnHotelRatingsUseCaseResponse>{
        const doesTheHotelExists = await this.hotelRepositorie.findById(HotelId)
        if(!doesTheHotelExists){
            throw new HotelIdDoesNotExistsError()
        }
        const ReturnHotelRatings = await this.ratingsRepositorie.ReturnByHotel(HotelId,Page)
        const ReturnHotelNote = await this.ratingsRepositorie.ReturnHotelRating(HotelId)
        return {
            ReturnHotelRatings,
            ReturnHotelNote,
        }
    }
}