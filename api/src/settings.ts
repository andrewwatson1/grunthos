import * as path from "path"

import { Cluster } from "@solana/web3.js"

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

export const GRUNTHOS_PORT = process.env.GRUNTHOS_PORT || 5904
export const GRUNTHOS_LOG_LEVEL = (
    process.env.GRUNTHOS_LOG_LEVEL || "info"
).toLowerCase()

export const BUGOUT_POEMS_JOURNAL_ID: string | undefined =
    process.env.BUGOUT_POEMS_JOURNAL_ID
if (!BUGOUT_POEMS_JOURNAL_ID) {
    throw new Error("BUGOUT_POEMS_JOURNAL_ID environment variable must be set")
}

export const BUGOUT_RESOURCE_APPLICATION_ID =
    process.env.BUGOUT_RESOURCE_APPLICATION_ID
if (!BUGOUT_RESOURCE_APPLICATION_ID) {
    throw new Error(
        "BUGOUT_RESOURCE_APPLICATION_ID environment variable must be set"
    )
}

// Solana
export const SolanaConfigPath: string | undefined =
    process.env.SOLANA_CONFIG_PATH
if (!SolanaConfigPath) {
    throw new Error("SOLANA_CONFIG_PATH environment variable must be set")
}
const mainKeypair = "id.json"
export const mainKeypairPath = path.resolve(SolanaConfigPath, mainKeypair)

function chooseSolanaCluster(): Cluster | undefined {
    switch (process.env.SOLANA_CLUSTER) {
        case "devnet":
        case "testnet":
        case "mainnet-beta": {
            return process.env.SOLANA_CLUSTER
        }
    }
    return "devnet"
}
export const solanaCluster = chooseSolanaCluster()
