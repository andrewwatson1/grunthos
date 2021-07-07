// CORS
const allowedOriginsRaw: string | undefined =
    process.env.GRUNTHOS_CORS_ALLOWED_ORIGINS
if (!allowedOriginsRaw) {
    throw new Error(
        "GRUNTHOS_CORS_ALLOWED_ORIGINS environment variable must be set"
    )
}
export const allowedOrigins: string[] = allowedOriginsRaw.split(",")

export const BUGOUT_REPORTER_TOKEN = process.env.BUGOUT_REPORTER_TOKEN
export const GRUNTHOS_SERVER_ID = process.env.GRUNTHOS_SERVER_ID

export const GRUNTHOS_PORT = process.env.GRUNTHOS_PORT || 5903

export const GRUNTHOS_LOG_LEVEL = (
    process.env.GRUNTHOS_LOG_LEVEL || "info"
).toLowerCase()
