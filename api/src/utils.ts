import BugoutClient from "@bugout/bugout-js"
import type { Request } from "express"

export const bugoutClient = new BugoutClient(
    "http://127.0.0.1:7474",
    "http://127.0.0.1:7475"
)

export function headerAuthToken(req: Request): string | null {
    const authHeaderRaw = req.headers.authorization
    if (authHeaderRaw && authHeaderRaw.startsWith("Bearer ")) {
        const authHeader = authHeaderRaw.split(" ")[1]
        return authHeader
    }
    return null
}
