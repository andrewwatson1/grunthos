/*
Solana token actions.

TODO(kompotkot): Re-write to work normal with Solana nodejs library
*/
import { exec } from "child_process"
import fs from "fs"
import * as path from "path"
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js"
import util from "util"

import {
    mainKeypairPath,
    solanaCluster,
    SolanaConfigPath,
} from "./settings"

const utilexec = util.promisify(exec)

const reToken = /Creating token (.*)$/
const reAccount = /Creating account (.*)$/
const reSignature = /Signature: (.*)$/

export const clusterUrl = clusterApiUrl(solanaCluster, false)

function readKeypairFromFile(filePath: string) {
    const keypairString = fs.readFileSync(filePath, { encoding: "utf8" })
    const keypairU8Array = new Uint8Array(JSON.parse(keypairString))
    return Keypair.fromSecretKey(keypairU8Array)
}

async function saveKeypairToFile(
    keypairName: string,
    keypair: number[]
): Promise<void> {
    const filename = path.join(SolanaConfigPath, keypairName)
    await fs.writeFileSync(filename, JSON.stringify(keypair), "utf8")
}

export async function establishSolana(): Promise<Connection> {
    const mainKeypair = readKeypairFromFile(mainKeypairPath)
    console.log(`Loaded main keypair with public key: ${mainKeypair.publicKey}`)

    const connection = new Connection(clusterUrl, "confirmed")
    const version = await connection.getVersion()
    console.log(
        "Established connection with Solana cluster:",
        clusterUrl,
        version
    )

    return connection
}

async function createToken(): Promise<string | null> {
    const { stdout, stderr } = await utilexec("spl-token create-token")
    if (stdout) {
        const result = stdout.toString().split("\n")
        const tokenPubkeyMatch = result[0].match(reToken)
        return tokenPubkeyMatch[1]
    }
    return null
}

async function createTokenAccount(token: string): Promise<any | null> {
    const { stdout, stderr } = await utilexec(
        `spl-token create-account ${token}`
    )
    if (stdout) {
        const result = stdout.toString().split("\n")
        const accountPubkeyMatch = result[0].match(reAccount)
        return accountPubkeyMatch[1]
    }
    return null
}

async function mintToken(
    tokenAccount: any,
    numOfTokens: number
): Promise<string | null> {
    const { stdout, stderr } = await utilexec(
        `spl-token mint ${tokenAccount} ${numOfTokens}`
    )
    if (stdout) {
        const result = stdout.toString().split("\n")
        const signatureMatch = result[3].match(reSignature)
        return signatureMatch[1]
    }
    return null
}

async function disableMint(token: string): Promise<string | null> {
    const { stdout, stderr } = await utilexec(
        `spl-token authorize ${token} mint --disable`
    )
    if (stdout) {
        const result = stdout.toString().split("\n")
        const signatureMatch = result[3].match(reSignature)
        return signatureMatch[1]
    }
}

export async function issueToken(): Promise<any> {
    /*
    Issue Solana token.
    */
    const tokenPublicKeyStr = await createToken()
    console.log(`Created token with PublicKey: ${tokenPublicKeyStr}`)

    const tokenAccountPubkey = await createTokenAccount(tokenPublicKeyStr)
    const tokenAccountPubkeyStr = tokenAccountPubkey.toString()
    console.log(
        `Created token account with PublicKey: ${tokenAccountPubkeyStr}`
    )

    const mintSignature = await mintToken(tokenPublicKeyStr, 1)
    const disableMintSignature = await disableMint(tokenPublicKeyStr)

    return { tokenPublicKeyStr, tokenAccountPubkeyStr }
}
