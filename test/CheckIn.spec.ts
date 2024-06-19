
import { it,beforeEach, expect } from "vitest";
import { inMemoryUserRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryUserRepositorie";
import { inMemoryHotelRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryHotelRepositorie";
import { CheckIn, Hotel, Prisma, User } from "@prisma/client";
import { CheckInUseCase } from "../src/Services/CheckIn";
import { inMemoryCheckInRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryCheckInRepositorie";
import { HotelIdDoesNotExistsError, UserIdDoesNotExistsError } from "../src/Services/Error/NotFoundError";
import { AlreadyDidCheckInToday, UserIsToFarFromTheHotelToCheckIn } from "../src/Services/Error/CommonErrors";

const hotelData = {
    Name:"teste hotel",
    Longitude:1,
    Latitude: 1,
    Description:"o melhor hotel da sua vida"
}

const userData = {
    Email:"testdev@gmail.com",
    Name:"teste",
    Password:"teste"
}

const providedLatitude = 1
const providedLongitude = 1

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
    const createCheckIn = await sup.execute({data,UserLatitude:providedLatitude,UserLongitude:providedLongitude})
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
    await  expect(sup.execute({data,UserLatitude:providedLatitude,UserLongitude:providedLongitude})).rejects.toBeInstanceOf(UserIdDoesNotExistsError)

})

it("should not be able to checkIn with a non existing Hotel Id",async()=>{
    const data:Prisma.CheckInUncheckedCreateInput = {
        HotelId:"abluble",
        UserId:createUser.Id,
        Id:"TesteCheckIn"
    }

    const sup = new CheckInUseCase(CheckInRepositorie,userRepositorie,hotelRepositorie)
    await  expect(sup.execute({data,UserLatitude:providedLatitude,UserLongitude:providedLongitude})).rejects.toBeInstanceOf(HotelIdDoesNotExistsError)

})

it("should not be able to CheckIn twice in the same day",async()=>{

    const data:Prisma.CheckInUncheckedCreateInput = {
        HotelId:createHotel.Id,
        UserId:createUser.Id,
        Id:"TesteCheckIn",
        createdAt:new Date()
    }
    
    const sup = new CheckInUseCase(CheckInRepositorie,userRepositorie,hotelRepositorie)
    await sup.execute({data,UserLatitude:providedLatitude,UserLongitude:providedLongitude})
    await expect(sup.execute({data,UserLatitude:providedLatitude,UserLongitude:providedLongitude})).rejects.toBeInstanceOf(AlreadyDidCheckInToday)   
})
it("should not be able to checkIn with distance from hotel bigger tan 2km",async()=>{
    const data:Prisma.CheckInUncheckedCreateInput = {
        HotelId:createHotel.Id,
        UserId:createUser.Id,
        Id:"TesteCheckIn"
    }
    const sup = new CheckInUseCase(CheckInRepositorie,userRepositorie,hotelRepositorie)
    expect(sup.execute({data,UserLatitude:4,UserLongitude:4})).rejects.toBeInstanceOf(UserIsToFarFromTheHotelToCheckIn)
})