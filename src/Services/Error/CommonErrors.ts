export class CheckInAlreadyValidated extends Error{
    constructor(){
        super("the specified CheckIn Has already Valdidated ")
    }
}