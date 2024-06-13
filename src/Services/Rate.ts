import { CheckIn, Prisma, Rating } from "@prisma/client";
import { error } from "console";
import { HotelIdDoesNotExistsError, UserIdDoesNotExistsError } from "./Error/NotFoundError";


type RatingUseCaseRequestParams = Prisma.RatingUncheckedCreateInput

interface RatingUseCaseResponse {
    Description:string,
    CreatedRating:Rating
}


export class RatingUseCase{
    constructor(private ratingRepositorie: any, private UserRepositorie:any, private HotelRepositorie:any){}

    async execute(data:RatingUseCaseRequestParams): Promise<RatingUseCaseResponse>{
        const checkIfTheInformedUserExists = await this.UserRepositorie.findById(data.UserId)
        if(!checkIfTheInformedUserExists){
            throw new UserIdDoesNotExistsError()
        }
        const checkInIfTheHotelExits = await this.HotelRepositorie.findById(data.HotelId)
        if(!checkInIfTheHotelExits){
            throw new HotelIdDoesNotExistsError()
        }

        const CreatedRating = await this.ratingRepositorie.create(data)

        return{
            CreatedRating,
            Description:"successfully Rated The specified Hotel"
        }
    }
}