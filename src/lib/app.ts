import fastify from "fastify";
import { Router } from "../http/router";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifyJwt from "@fastify/jwt";
import { ZodError } from "zod";

export const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyJwt,{
    secret:"supersecret"
})
app.register(Router)


app.setErrorHandler((err,req,res)=>{
    if(err instanceof ZodError){
        return res.status(400).send({
            StatusCode:400,
            Description:"Validation Error",
            Error:err.format()
        })
    }

    return res.status(500).send({
        StatusCode:500,
        Description:"Unknow Error"
    })

    
})