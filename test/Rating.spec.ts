import { Hotel, User } from "@prisma/client";
import { beforeEach, expect, it } from "vitest";
import { inMemoryUserRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryUserRepositorie";
import { inMemoryHotelRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryHotelRepositorie";
import { inMemoryRatingRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryRatinRepositorie";
import { RatingUseCase } from "../src/Services/Rate";
import { HotelIdDoesNotExistsError, UserIdDoesNotExistsError } from "../src/Services/Error/NotFoundError";


const hotelData = {
    Name:"teste hotel",
    Longitude:1,
    Latitude: 2,
    Description:"o melhor hotel da sua vida"
}

const userData = {
    Email:"testdev@gmail.com",
    Name:"teste",
    Password:"teste"
}



let createHotel:Hotel
let createUser:User
let userRepositorie:inMemoryUserRepositorie
let hotelRepositorie:inMemoryHotelRepositorie
let ratingRepositorie:inMemoryRatingRepositorie


beforeEach(async()=>{
    userRepositorie = new inMemoryUserRepositorie()
    hotelRepositorie = new inMemoryHotelRepositorie()
    ratingRepositorie = new inMemoryRatingRepositorie

    createHotel = await hotelRepositorie.create(hotelData)
    createUser = await userRepositorie.create(userData)
})

it("should be able to Rate an Hotel",async ()=>{
    const sut = new RatingUseCase(ratingRepositorie,userRepositorie,hotelRepositorie)

    const RateAnHotel = await sut.execute({
        HotelId:createHotel.Id,
        UserId:createUser.Id,
        Value:5,
        Id:1
    })

    expect(RateAnHotel.CreatedRating.Value).toBe(5)

})


it("should not be able to Rate an non existing hotel",async ()=>{
    const sut = new RatingUseCase(ratingRepositorie,userRepositorie,hotelRepositorie)

    const ratingData = {
        HotelId:"createHotel.Id",
        UserId:createUser.Id,
        Value:5,
        Id:1
    }

    await expect(sut.execute(ratingData)).rejects.toBeInstanceOf(HotelIdDoesNotExistsError)

})

it("should not be able to Rate an hotel as a non existing user",async ()=>{
    const sut = new RatingUseCase(ratingRepositorie,userRepositorie,hotelRepositorie)

    const ratingData = {
        HotelId:createHotel.Id,
        UserId:"createUser.Id",
        Value:5,
        Id:1
    }

    await expect(sut.execute(ratingData)).rejects.toBeInstanceOf(UserIdDoesNotExistsError)

})