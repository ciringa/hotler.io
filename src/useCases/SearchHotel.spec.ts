import { Prisma } from "@prisma/client";
import { it , beforeEach, expect} from "vitest";
import { inMemoryHotelRepositorie } from "../repositorie/InMemoryRepositorie.ts/inMemoryHotelRepositorie";
import { ReturnHotelListByQueryUseCase } from "./SearchHotel";

const hotelData:Prisma.HotelCreateInput = {
    Name:"teste hotel",
    Longitude:1,
    Latitude: 2,
    Description:"o melhor hotel da sua vida"
}

let hotelRepositorie:inMemoryHotelRepositorie

beforeEach(async()=>{
    hotelRepositorie = new inMemoryHotelRepositorie()

    hotelRepositorie.create(hotelData)
})

it("should be able to Search for Hotels ",async()=>{
    const sup = new ReturnHotelListByQueryUseCase(hotelRepositorie)
    const returnQuery = await sup.execute({
        Query:"teste",
        Page:1
    })
    expect(returnQuery.ReturnObjectList[0].Name).toBe(hotelData.Name)
})

it("should be able to return hotel search Paginated ",async()=>{
    const sup = new ReturnHotelListByQueryUseCase(hotelRepositorie)

    for(let i = 0; i<20;i++){
        hotelRepositorie.create(hotelData)
    }
    const returnQuery = await sup.execute({
        Query:"test",
        Page:2
    })
    expect(returnQuery.ReturnObjectList.length).toBe(1)
})

it("should be able to return all hotels paginated with no search query ",async()=>{
    const sup = new ReturnHotelListByQueryUseCase(hotelRepositorie)

    for(let i = 0; i<20;i++){
        hotelRepositorie.create(hotelData)
    }
    const returnQuery = await sup.execute({
        Query:null,
        Page:2
    })
    expect(returnQuery.ReturnObjectList.length).toBe(1)
})