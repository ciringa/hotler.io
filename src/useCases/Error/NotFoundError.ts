export class UserIdDoesNotExistsError extends Error{
    constructor(){
        super("the specified User Id does Not exists")
    }
}

export class HotelIdDoesNotExistsError extends Error{
    constructor(){
        super("the specified Hotel Id does Not exists")
    }
}