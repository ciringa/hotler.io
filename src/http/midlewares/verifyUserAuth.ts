import { FastifyReply, FastifyRequest } from "fastify";

export async function VerifyJWTAuthentication(req:FastifyRequest, res:FastifyReply){
    console.log("checking Jwt TOken From VerifyJWTToken middleware")
    const verifyJWTtoken = await req.jwtVerify()
}