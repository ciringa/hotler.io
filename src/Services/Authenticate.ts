
import { InvalidAuthenticationKeys, UserEmailDoesNotExists } from "./Error/authenticateErrors"
import { compare } from "bcryptjs"

interface UserAuthenticateRequestPaams{
    Password:string,
    Email:string
}

export class UserAuthenticateUseCase{
    constructor(private UserRepositorie:any){}
    async execute({Email,Password}:UserAuthenticateRequestPaams):Promise<string>{
        const doesTheUserExists = await this.UserRepositorie.findByEmail(Email)
        if(!doesTheUserExists){
            throw new UserEmailDoesNotExists()
        }else{
            const doesTheInformedPasswordMatchesTheHashedPassword = await compare(Password, doesTheUserExists.Password)
            if(doesTheInformedPasswordMatchesTheHashedPassword){
                console.log("Email and Password matches")
                return doesTheUserExists.Id
            }else{
                throw new InvalidAuthenticationKeys()
            }
        }
    }
}