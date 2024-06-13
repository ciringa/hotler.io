import { beforeEach, expect, it } from "vitest";
import { inMemoryUserRepositorie } from "../src/repositorie/InMemoryRepositorie.ts/inMemoryUserRepositorie";
import { RegisterUserUseCase } from "../src/Services/RegisterUser"
import { User } from "@prisma/client";
import { UserAuthenticateUseCase } from "../src/Services/Authenticate";
import { UserIdDoesNotExistsError } from "../src/Services/Error/NotFoundError";
import { InvalidAuthenticationKeys, UserEmailDoesNotExists } from "../src/Services/Error/authenticateErrors";


let userRepositorie:inMemoryUserRepositorie
let RegisterUser:RegisterUserUseCase
let ReturnUser:User
let SUT:UserAuthenticateUseCase



const userCreateData = {
    Email:"testdev@gmail.com",
    Name:"teste",
    Password:"teste"
}
const authenticateinputs ={
    Email:"testdev@gmail.com",
    Password:"teste"
}
beforeEach(async()=>{
    userRepositorie = new inMemoryUserRepositorie
    RegisterUser = new RegisterUserUseCase(userRepositorie)
    SUT = new UserAuthenticateUseCase(userRepositorie)
    ReturnUser = (await RegisterUser.execute(userCreateData)).createObject
})

it("should be able to login",async()=>{
    const tryToLogin = await SUT.execute(authenticateinputs)
    expect(tryToLogin).toBe(ReturnUser.Id)
})
it("should not be able to login with a non existing Email Adress",async()=>{ 
    await expect(SUT.execute({
        Email:"pato",
        Password:authenticateinputs.Password
    })).rejects.toBeInstanceOf(UserEmailDoesNotExists)
})
it("should not be able to login with a wrong password",async()=>{ 
    await expect(SUT.execute({
        Email:authenticateinputs.Email,
        Password:"wrongPassword"
    })).rejects.toBeInstanceOf(InvalidAuthenticationKeys)
})