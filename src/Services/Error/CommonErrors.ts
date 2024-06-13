export class CheckInAlreadyValidated extends Error{
    constructor(){
        super("the specified CheckIn Has already Valdidated ")
    }
}
export class MustBeLoggedError extends Error{
    constructor(){
        super("Must to be Logged To perform the following actions")
    }
}