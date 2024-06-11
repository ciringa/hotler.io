export class EmailAdressAlreadyInUseError extends Error{
    constructor(){
        super("this email adress is already in error")
    }
}