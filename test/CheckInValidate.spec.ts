import { Hotel, User } from "@prisma/client";
import { beforeEach, expect, it } from "vitest";
import { inMemoryUserRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryUserRepositorie";
import { inMemoryHotelRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryHotelRepositorie";
import { inMemoryCheckInRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryCheckInRepositorie";
import { CheckInUseCase } from "../src/useCases/CheckIn";
import { ValidateCheckInUseCase } from "../src/useCases/CheckInvalidate";

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
let CheckInRepositorie:inMemoryCheckInRepositorie
let sut:ValidateCheckInUseCase
let checkInCreateUseCase:CheckInUseCase
beforeEach(async()=>{
    userRepositorie = new inMemoryUserRepositorie()
    hotelRepositorie = new inMemoryHotelRepositorie()
    CheckInRepositorie = new inMemoryCheckInRepositorie()

    checkInCreateUseCase = new CheckInUseCase(CheckInRepositorie,userRepositorie,hotelRepositorie)
    sut = new ValidateCheckInUseCase(CheckInRepositorie)

    createHotel = await hotelRepositorie.create(hotelData)
    createUser = await userRepositorie.create(userData)
})
it("should be able to validate a checkIn",async()=>{
    const createdCheckIn = await checkInCreateUseCase.execute({
        HotelId:createHotel.Id,
        UserId:createUser.Id,
        Id:"TesteCheckIn"
    })
    const valdiatedCheckIn = await sut.execute(createdCheckIn.CreatedCheckIn.Id)
    
    expect(valdiatedCheckIn.validateCheckIn.validatedAt).toBeDefined
})