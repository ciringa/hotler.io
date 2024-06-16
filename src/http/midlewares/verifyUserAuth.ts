import { FastifyReply, FastifyRequest } from "fastify";
import { jwtValidationNotFoundError } from "../errors/JWTValidationNotFoundError";

export async function VerifyJWTAuthentication(req:FastifyRequest, res:FastifyReply){
    const verifyJWTtoken = await req.jwtVerify()
    console.log("ajksjakjsja")
    if(!verifyJWTtoken){
        res.status(401).send({
            Description:"Missing JWT Token"
        })
        throw new jwtValidationNotFoundError
    }
}