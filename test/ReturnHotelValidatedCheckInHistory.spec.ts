import { Hotel } from "@prisma/client"
import { inMemoryCheckInRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryCheckInRepositorie"
import { inMemoryHotelRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryHotelRepositorie"
import { ReturnValidatedCheckInHotelHistoryUseCase } from "../src/Services/RetunHotelValidatedCheckIns"
import { beforeEach, expect, it } from "vitest"
import { HotelIdDoesNotExistsError } from "../src/Services/Error/NotFoundError"


let CheckInRepositorie:inMemoryCheckInRepositorie
let hotelRepositorie:inMemoryHotelRepositorie
let sut:ReturnValidatedCheckInHotelHistoryUseCase
let returnHotel:Hotel
beforeEach(async()=>{
    CheckInRepositorie = new inMemoryCheckInRepositorie()
    hotelRepositorie = new inMemoryHotelRepositorie()
    returnHotel = await hotelRepositorie.create({
        Name:"teste hotel",
        Longitude:1,
        Latitude: 2,
        Description:"o melhor hotel da sua vida"
    })
    const checkIn = await CheckInRepositorie.create({
        HotelId:returnHotel.Id,
        UserId:"test user",
        Id:"testId",
    })
 
    const validation = await CheckInRepositorie.ValidateCheckIn(checkIn.Id)

    sut = new ReturnValidatedCheckInHotelHistoryUseCase(hotelRepositorie,CheckInRepositorie)
})

it("should be able to return a list of user Checkins",async()=>{
    const listOfHotelCheckIns = await sut.execute(returnHotel.Id,1)

    expect(listOfHotelCheckIns.CheckInlist[0].Id).toBe("testId")
})
it("should not be able to return a list of user Checkins for a non existing user",async()=>{
   await expect( sut.execute("test",1)).rejects.toBeInstanceOf(HotelIdDoesNotExistsError)
})
it("should be able to return the checkIn Amount of an user",async()=>{
    const listOfHotelCheckIns = await sut.execute(returnHotel.Id,1)

    expect(listOfHotelCheckIns.Amount).toBe(1)
})
