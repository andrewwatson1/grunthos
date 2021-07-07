import os from "os"

import Reporter, { HumbugConsent } from "@bugout/humbug"
import type { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from "uuid"

import { BUGOUT_REPORTER_TOKEN, GRUNTHOS_SERVER_ID } from "./settings"
import { GRUNTHOS_VERSION } from "../version"

const consent = new HumbugConsent(true)

export const sessionId = uuidv4()

export let grunthosTags = [`version:${GRUNTHOS_VERSION}`]
try {
    grunthosTags.push(`hostname:${os.hostname()}`)
} catch (e) {
    console.warn(`Could not add hostname tag: ${e}`)
}

export const reporter = new Reporter(
    "grunthos",
    consent,
    GRUNTHOS_SERVER_ID,
    uuidv4(),
    BUGOUT_REPORTER_TOKEN
)

export function errorReportingMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    reporter.errorReport(err, grunthosTags, true)
    res.status(500).send({ error: "Internal server error" })
}
