import { FastifyReply, FastifyRequest } from "fastify";
import { MustBeLoggedError } from "../../Services/Error/CommonErrors";

export async function VerifyJWTAuthentication(req:FastifyRequest, res:FastifyReply){
    const verifyJWTtoken = await req.jwtVerify()
    if(!verifyJWTtoken){
        res.status(401).send({
            DEscription:"must be logged to peform the request"
        })
    }
}