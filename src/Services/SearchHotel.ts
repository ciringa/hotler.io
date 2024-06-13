import { Hotel } from "@prisma/client"
import { time } from "console"

interface SearchParams {
    Query:string | null,
    Page:number
}
interface SearchResponse{
    ReturnObjectList : Hotel[]
}

export class ReturnHotelListByQueryUseCase{
    constructor(private hotelRepositorie:any){

    }
    async execute({Query,Page}:SearchParams): Promise<SearchResponse>{
        let ReturnObjectList:any
        if(!Query){
            console.log("search full hotel list")
            ReturnObjectList = await this.hotelRepositorie.returnHotelList(Page)
        }else{
            ReturnObjectList = await this.hotelRepositorie.searchHotelsByName(Query,Page)
        }

        return {
            ReturnObjectList
        }


    }
}