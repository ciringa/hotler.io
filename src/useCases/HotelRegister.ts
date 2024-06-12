import { Hotel, Prisma } from "@prisma/client";
import { HotelNameIsAlreadyInUse } from "./Error/RegisterErrors";

type HotelRegisterUseCaseRequestParams = Prisma.HotelCreateInput
interface HotelRegisterUseCaseResponde {
    ReturnObject: Hotel
}
export class HotelRegisterUseCase {
    constructor(private hotelRepositorie:any){
    }
    async execute(data:HotelRegisterUseCaseRequestParams):Promise<HotelRegisterUseCaseResponde>{
        const TheresAnyHotelWIthTheSameName = await this.hotelRepositorie.findByName(data.Name)
        if(TheresAnyHotelWIthTheSameName){
            throw new HotelNameIsAlreadyInUse()
        }

        const ReturnObject = await this.hotelRepositorie.create(data)
        return{
            ReturnObject,
        }
    }
}