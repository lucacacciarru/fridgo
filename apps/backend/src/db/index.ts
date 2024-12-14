import * as schema from "./schema"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const queryClient = postgres(process.env.DATABASE_URL, {
    prepare: false,
})

export const db = drizzle(queryClient, {
    schema,
})