import fastify from "fastify";
import { Router } from "../http/router";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import {fastifyJwt} from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);




app.register(fastifyJwt,{
    secret:'supersecret'
})

app.register(fastifySwagger,{
    openapi: {
        openapi: '3.0.0',
        info: {
          title: 'hotler api',
          description: 'A simple hotel management api',
          version: '0.1.0'
        }, 
        tags:[
            {name:"Auth",description:"User Authentication related tests. all the following routes involve jwt token manipulation"},
            {name:"User", description:"User management related routes.\n includes creation of all kinds of user even managers and clients of your aplication"},
            {name:"Hotel",description:"Hotel related routes.\n includes routes used to create, edit and manipulate hotels in your aplication.\n all the following routes requires a logged user with admin role"},
            {name:"CheckIn", description:"CheckIn related routes. \n all the following routes are used to manage the checkIns of an user in a hotel."},
            {name:"Ratings", description:"Ratings related routes. \n all the following routes are used to manage the Ratings of an hotel made by an user."},
        ],
        servers:[]
    },
    transform:jsonSchemaTransform
})


app.register(Router)


app.register(fastifySwaggerUi,{
    routePrefix:"/docs"
})

// app.setErrorHandler((err,req,res)=>{
//     if(err instanceof ZodError){
//         return res.status(400).send({
//             StatusCode:400,
//             Description:"Validation Error",
//             Error:err.format()
//         })
//     }
//     if(err instanceof FastifyRelatedError){
//         return res.status(400).send({
//             StatusCode:500,
//             Description:"internal server Error",
//             Error:err
//         })
//     }
//     return res.status(500).send({
//         StatusCode:500,
//         Description:"Unknow Error"
//     })
// })