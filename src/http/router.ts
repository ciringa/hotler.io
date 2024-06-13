import { FastifyInstance } from "fastify";
import { RegisterUserRoute } from "./controlers/user/RegisterUser";
import { AuthenticateRoute } from "./controlers/authentication/authRoute";
import { ReturnProfile } from "./controlers/authentication/profileRoute";


export async function Router(app:FastifyInstance) {
    app.register(RegisterUserRoute,{
        prefix:"/user"
    })
    
    app.register(AuthenticateRoute,{
        prefix:"/auth"
    })
    app.register(ReturnProfile,{
        prefix:"/me"
    })
}