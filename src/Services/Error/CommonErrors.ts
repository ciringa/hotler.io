export class CheckInAlreadyValidated extends Error{
    constructor(){
        super("the specified CheckIn Has already Valdidated ")
    }
}
export class CheckInMustBeValidatedInTheSameDay extends Error{
    constructor(){
        super("The CheckIn must to be validated in the same day")
    }
}
export class AlreadyDidCheckInToday extends Error{
    constructor(){
        super("the specified CheckIn Has already Valdidated ")
    }
}
export class MustBeLoggedError extends Error{
    constructor(){
        super("Must to be Logged To perform the following actions")
    }
}

export class UserIsToFarFromTheHotelToCheckIn extends Error {
    constructor(){
        super("The user is far away from the hotel")
    }
}