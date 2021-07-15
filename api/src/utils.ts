import BugoutClient from "@bugout/bugout-js"
import type { Request } from "express"

export const bugoutClient = new BugoutClient()

export function headerAuthToken(req: Request): string | null {
    const authHeaderRaw = req.headers.authorization
    if (authHeaderRaw && authHeaderRaw.startsWith("Bearer ")) {
        const authHeader = authHeaderRaw.split(" ")[1]
        return authHeader
    }
    return null
}
