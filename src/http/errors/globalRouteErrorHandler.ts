export class FastifyRelatedError extends Error
{
    constructor(){
        super("something Bad Happened at fastify")
    }
}