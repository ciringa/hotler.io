import { FastifyInstance } from "fastify";
import { RegisterUserRoute } from "./controlers/user/RegisterUser";
import { AuthenticateRoute } from "./controlers/authentication/authRoute";
import { ReturnProfile } from "./controlers/authentication/profileRoute";
import { RegisterHotel } from "./controlers/hotel/RegisterHotel";
import { SearchHotelByQuery } from "./controlers/hotel/SearchHotel";



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
    app.register(RegisterHotel,{
        prefix:"/hotel"
    })
    app.register(SearchHotelByQuery,{
        prefix:"/hotel/search"
    })
}
