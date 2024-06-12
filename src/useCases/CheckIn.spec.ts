
import { it,beforeEach, expect } from "vitest";
import { inMemoryUserRepositorie } from "../repositorie/InMemoryRepositorie.ts/inMemoryUserRepositorie";
import { inMemoryHotelRepositorie } from "../repositorie/InMemoryRepositorie.ts/inMemoryHotelRepositorie";
import { CheckIn, Hotel, Prisma, User } from "@prisma/client";
import { CheckInUseCase } from "./CheckIn";
import { inMemoryCheckInRepositorie } from "../repositorie/InMemoryRepositorie.ts/inMemoryCheckInRepositorie";
import { HotelIdDoesNotExistsError, UserIdDoesNotExistsError } from "./Error/NotFoundError";

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

beforeEach(async()=>{
    userRepositorie = new inMemoryUserRepositorie()
    hotelRepositorie = new inMemoryHotelRepositorie()
    CheckInRepositorie = new inMemoryCheckInRepositorie()

    createHotel = await hotelRepositorie.create(hotelData)
    createUser = await userRepositorie.create(userData)
})

it("should be able to checkIn",async()=>{
    const data:Prisma.CheckInUncheckedCreateInput = {
        HotelId:createHotel.Id,
        UserId:createUser.Id,
        Id:"TesteCheckIn"
    }

    const sup = new CheckInUseCase(CheckInRepositorie,userRepositorie,hotelRepositorie)
    const createCheckIn = await sup.execute(data)
    expect(createCheckIn.CreatedCheckIn.HotelId).toBe(createHotel.Id)
    expect(createCheckIn.CreatedCheckIn.UserId).toBe(createUser.Id)
})

it("should not be able to checkIn with a non existing user Id",async()=>{
    const data:Prisma.CheckInUncheckedCreateInput = {
        HotelId:createHotel.Id,
        UserId:"abluble",
        Id:"TesteCheckIn"
    }

    const sup = new CheckInUseCase(CheckInRepositorie,userRepositorie,hotelRepositorie)
    await  expect(sup.execute(data)).rejects.toBeInstanceOf(UserIdDoesNotExistsError)

})

it("should not be able to checkIn with a non existing Hotel Id",async()=>{
    const data:Prisma.CheckInUncheckedCreateInput = {
        HotelId:"abluble",
        UserId:createUser.Id,
        Id:"TesteCheckIn"
    }

    const sup = new CheckInUseCase(CheckInRepositorie,userRepositorie,hotelRepositorie)
    await  expect(sup.execute(data)).rejects.toBeInstanceOf(HotelIdDoesNotExistsError)

})