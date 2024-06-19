import { Hotel, User } from "@prisma/client";
import { beforeEach, expect, it, vi } from "vitest";
import { inMemoryUserRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryUserRepositorie";
import { inMemoryHotelRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryHotelRepositorie";
import { inMemoryCheckInRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryCheckInRepositorie";
import { CheckInUseCase } from "../src/Services/CheckIn";
import { ValidateCheckInUseCase } from "../src/Services/CheckInvalidate";
import { afterEach } from "node:test";
import { CheckInAlreadyValidated, CheckInMustBeValidatedInTheSameDay } from "../src/Services/Error/CommonErrors";

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

    
    sut = new ValidateCheckInUseCase(CheckInRepositorie)

    createHotel = await hotelRepositorie.create(hotelData)
    createUser = await userRepositorie.create(userData)
    vi.useFakeTimers()
})

afterEach(()=>{
    vi.useRealTimers()
})
it("should be able to validate a checkIn",async()=>{
    const createdCheckIn = await CheckInRepositorie.create({
        HotelId:createHotel.Id,
        UserId:createUser.Id,
        Id:"TesteCheckIn"
    })
    const valdiatedCheckIn = await sut.execute(createdCheckIn.Id)
    expect(valdiatedCheckIn.validateCheckIn.validatedAt).string
})
it("should no be able to validate an already valdidated checkIn",async()=>{
    const createdCheckIn = await CheckInRepositorie.create({
        HotelId:createHotel.Id,
        UserId:createUser.Id,
        Id:"TesteCheckIn"
    })
    const valdiatedCheckIn = await sut.execute(createdCheckIn.Id)
    await expect(sut.execute(createdCheckIn.Id)).rejects.toBeInstanceOf(CheckInAlreadyValidated)
})
it("should not be able to validate a checkIn in a diferent day", async()=>{
    vi.setSystemTime(new Date(2024,6,12))
    const createdCheckIn = await CheckInRepositorie.create({
        HotelId:createHotel.Id,
        UserId:createUser.Id,
        Id:"TesteCheckIn"
    })
    vi.setSystemTime(new Date(2024,6,15))
    await expect(sut.execute(createdCheckIn.Id)).rejects.toBeInstanceOf(CheckInMustBeValidatedInTheSameDay)
})