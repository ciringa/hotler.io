export class InvalidAuthenticationKeys extends Error{
    constructor(){
        super("Invalid Email or Password")
    }
}

export class UserEmailDoesNotExists extends Error{
    constructor(){
        super("The specified Email adress does not exists")
    }
}