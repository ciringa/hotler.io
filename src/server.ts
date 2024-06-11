import { app } from "./lib/app";
import { PORT, HOST } from "./env/env";

const port = Number(PORT) || 2345
const host = HOST || "0.0.0.0"

app.listen({
    port,
    host,
},(err,path)=>{
    console.log(err||path)
})