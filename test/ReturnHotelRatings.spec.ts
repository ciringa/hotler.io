import { beforeEach, expect, it } from "vitest";
import { Hotel, Prisma, User } from "@prisma/client";
import { inMemoryRatingRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryRatinRepositorie";
import { ReturnUserRatingsUseCase } from "../src/useCases/ReturnUserRatings";
import { UserIdDoesNotExistsError } from "../src/useCases/Error/NotFoundError";
import { inMemoryHotelRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryHotelRepositorie";
import { ReturnHotelRatingsUseCase } from "../src/useCases/ReturnHotelRatings";

const hotelData:Prisma.HotelCreateInput = {
    Name:"teste hotel",
    Longitude:1,
    Latitude: 2,
    Description:"o melhor hotel da sua vida"
}

let hotelRepositorie:inMemoryHotelRepositorie
let ratingsRepositorie:inMemoryRatingRepositorie
let createdObject:Hotel
beforeEach(async()=>{
    hotelRepositorie = new inMemoryHotelRepositorie()
    ratingsRepositorie = new inMemoryRatingRepositorie()
    createdObject = await hotelRepositorie.create(hotelData)
    for(let i = 0; i<22;i++){
        ratingsRepositorie.create({
            HotelId:createdObject.Id,
            UserId:"createdObject.Id",
            Value:5,
            Id:i
        })
    }
})
it("should be able to return the rating list of an Hotel", async()=>{
    const sup = new ReturnHotelRatingsUseCase(hotelRepositorie,ratingsRepositorie)
    const returnList = await sup.execute(createdObject.Id,1)
    expect(returnList.ReturnHotelRatings[0].HotelId).toBe(createdObject.Id)
})

it("should be able to return the rating list of an Hotel Paginated", async()=>{
    const sup = new ReturnHotelRatingsUseCase(hotelRepositorie,ratingsRepositorie)
    const returnList = await sup.execute(createdObject.Id,2)
    expect(returnList.ReturnHotelRatings.length).toBe(2)
})

it("should not be able to return the rating list of an non existing Hotel", async()=>{
    const sup = new ReturnUserRatingsUseCase(hotelRepositorie,ratingsRepositorie)
    await expect(sup.execute("createdObject.Id",1)).rejects.toBeInstanceOf(UserIdDoesNotExistsError)
})

it("should be able to return the rating of an Hotel", async()=>{
    const sup = new ReturnHotelRatingsUseCase(hotelRepositorie,ratingsRepositorie)
    const returnList = await sup.execute(createdObject.Id,1)
    const media = (ratingsRepositorie.list.length*5)/ratingsRepositorie.list.length
    expect(returnList.ReturnHotelNote).toBe(media)
})
