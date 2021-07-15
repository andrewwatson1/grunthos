import bunyan from "bunyan"
import type { Request, Response, NextFunction } from "express"
import { v1 as uuid1 } from "uuid"

import { GRUNTHOS_LOG_LEVEL } from "./settings"

const logLevels: { [index: string]: number } = {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
}

const logLevel = logLevels[GRUNTHOS_LOG_LEVEL]
    ? logLevels[GRUNTHOS_LOG_LEVEL]
    : logLevels["info"]

export const logger = bunyan.createLogger({
    name: "grunthos",
    level: logLevel,
    serializers: {
        err: bunyan.stdSerializers.err,
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res,
    },
})

export function loggingMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const requestID = uuid1()
    const start = new Date()
    logger.info({ req, requestID, start }, "Request received")
    next()
    const end = new Date()
    const duration = end.getTime() - start.getTime()
    logger.info({ res, requestID, start, end, duration }, "Response sent")
}
