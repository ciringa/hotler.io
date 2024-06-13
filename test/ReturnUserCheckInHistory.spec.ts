import { it , beforeEach, expect} from "vitest";
import { inMemoryCheckInRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryCheckInRepositorie";
import { ReturnCheckInUserHistoryUseCase } from "../src/Services/ReturnUserCheckInHistory";
import { inMemoryUserRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryUserRepositorie";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { UserIdDoesNotExistsError } from "../src/Services/Error/NotFoundError";


let CheckInRepositorie:inMemoryCheckInRepositorie
let userRepositorie:inMemoryUserRepositorie
let sut:ReturnCheckInUserHistoryUseCase
let returnUser:User
beforeEach(async()=>{
    CheckInRepositorie = new inMemoryCheckInRepositorie()
    userRepositorie = new inMemoryUserRepositorie()
    returnUser = await userRepositorie.create({
        Id:randomUUID(),
        Email:"testdev@gmail.com",
        Name:"teste",
        Password:"teste"
    })
    CheckInRepositorie.create({
        HotelId:"test hotel",
        UserId:returnUser.Id,
        Id:"testId",
    })
    sut = new ReturnCheckInUserHistoryUseCase(userRepositorie,CheckInRepositorie)
})

it("should be able to return a list of user Checkins",async()=>{
    const listOfUserCheckIns = await sut.execute(returnUser.Id,1)

    expect(listOfUserCheckIns.CheckInlist[0].Id).toBe("testId")
})
it("should not be able to return a list of user Checkins for a non existing user",async()=>{
   await expect( sut.execute("test",1)).rejects.toBeInstanceOf(UserIdDoesNotExistsError)
})
it("should be able to return the checkIn Amount of an user",async()=>{
    const listOfUserCheckIns = await sut.execute(returnUser.Id,1)

    expect(listOfUserCheckIns.Amount).toBe(1)
})