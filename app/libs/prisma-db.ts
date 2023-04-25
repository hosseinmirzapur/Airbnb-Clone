import { PrismaClient } from "@prisma/client"

declare global {
	var prisma: PrismaClient | undefined
}

/*  If Operations below doesn't get implemented,
    then the hot reload of next.js will make multiple instances of PrismaClient.
    This will cause issues with the database.
    To solve this, we separate production logic from development logic.
*/

const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
