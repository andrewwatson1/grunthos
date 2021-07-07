import cors from "cors"
import type { CorsOptions } from "cors"
import express from "express"

import { reporter, grunthosTags, errorReportingMiddleware } from "./utils/reporting"
import { usersAPI } from "./routes/users"
import { loggingMiddleware } from "./utils/logging"
import { allowedOrigins, GRUNTHOS_PORT } from "./utils/settings"
import { GRUNTHOS_VERSION } from "./version"

const app = express()

const corsConfiguration: CorsOptions = {
    origin: allowedOrigins,
    preflightContinue: false,
}
const corsMiddleware = cors(corsConfiguration)
app.use(corsMiddleware)

app.use(express.json())
app.use(loggingMiddleware)
app.use("/users", usersAPI)

app.get("/ping", (_, res) => {
    res.send({ message: "200 OK" })
})
app.get("/version", (_, res) => {
    res.send({ version: GRUNTHOS_VERSION })
})
app.get("*", (_, res) => {
    res.status(404).send({ error: "Not found" })
})

// Error-handling middleware
app.use(errorReportingMiddleware)

app.listen(GRUNTHOS_PORT, () => {
    reporter.systemReport(grunthosTags, true)
    console.log(`grunthos started on port: ${GRUNTHOS_PORT}`)
    console.log(`CORS allowed origins: ${JSON.stringify(allowedOrigins)}`)
})
