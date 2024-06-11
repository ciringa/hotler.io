import {expect, it} from "vitest"
import { inMemoryUserRepositorie } from "../repositorie/InMemoryRepositorie.ts/inMemoryUserRepositorie"
import { RegisterUserUseCase } from "./RegisterUser"
import { compare } from "bcryptjs"
import { EmailAdressAlreadyInUseError } from "./Error/RegisterErrors"

const userCreateData = {
    Email:"testdev@gmail.com",
    Name:"teste",
    Password:"teste"
}
it("should be able to register an user",async()=>{
    const userRepositorie = new inMemoryUserRepositorie()
    const registerUser = new RegisterUserUseCase(userRepositorie)

    const returnObject = await registerUser.execute(userCreateData)
    expect(returnObject.createObject.Email).toBe("testdev@gmail.com")
})

it("should be able to hash the password",async ()=>{
    const userRepositorie = new inMemoryUserRepositorie()
    const registerUser = new RegisterUserUseCase(userRepositorie)

    const returnObject = await registerUser.execute(userCreateData)

    const checkIfThePasswordIsHashed = await compare("teste",returnObject.createObject.Password)
    expect(checkIfThePasswordIsHashed).toBe(true)
})

it("should not be able to register twice with the same email ",async ()=>{
    const userRepositorie = new inMemoryUserRepositorie()
    const registerUser = new RegisterUserUseCase(userRepositorie)

    const returnObject = await registerUser.execute(userCreateData)
    await expect(registerUser.execute(userCreateData)).rejects.toBeInstanceOf(EmailAdressAlreadyInUseError)
})