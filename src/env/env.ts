import "dotenv/config"
import {z} from "zod"

const schema = z.object({
    DATABASE_URL:z.string(),
    HOST:z.string(),
    PORT:z.string(),
    PASSWORD_HASH:z.string(),
    NODE_ENV:z.enum(["dev","deploy","test"]).default("dev")
})

export const {PORT,NODE_ENV,HOST,DATABASE_URL,PASSWORD_HASH} = schema.parse(process.env)

