import { beforeEach, expect, it } from "vitest";
import { inMemoryUserRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryUserRepositorie";
import { Prisma, User } from "@prisma/client";
import { inMemoryRatingRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryRatinRepositorie";
import { ReturnUserRatingsUseCase } from "../src/Services/ReturnUserRatings";
import { UserIdDoesNotExistsError } from "../src/Services/Error/NotFoundError";

const userData:Prisma.UserCreateInput = {
        Email:"teste@gmail.com",
        Password:"sla porra",
        Name:"teste dev",
        Id:"testeId"
}
let userRepositorie:inMemoryUserRepositorie
let ratingsRepositorie:inMemoryRatingRepositorie
let createdObject:User
beforeEach(async()=>{
    userRepositorie = new inMemoryUserRepositorie()
    ratingsRepositorie = new inMemoryRatingRepositorie()
    createdObject = await userRepositorie.create(userData)
    for(let i = 0; i<22;i++){
        ratingsRepositorie.create({
            HotelId:"ashajshajsh",
            UserId:createdObject.Id,
            Value:5,
            Id:i
        })
    }
})
it("should be able to return the rating list of an user", async()=>{
    const sup = new ReturnUserRatingsUseCase(userRepositorie,ratingsRepositorie)
    const returnList = await sup.execute(createdObject.Id,1)
    expect(returnList.returnUserRatingList[0].UserId).toBe(createdObject.Id)
})

it("should be able to return the rating list of an user Paginated", async()=>{
    const sup = new ReturnUserRatingsUseCase(userRepositorie,ratingsRepositorie)
    const returnList = await sup.execute(createdObject.Id,2)
    expect(returnList.returnUserRatingList.length).toBe(2)
})

it("should not be able to return the rating list of an non existing user", async()=>{
    const sup = new ReturnUserRatingsUseCase(userRepositorie,ratingsRepositorie)
    await expect(sup.execute("createdObject.Id",1)).rejects.toBeInstanceOf(UserIdDoesNotExistsError)
})
