import { BugoutTypes } from "@bugout/bugout-js"
import express from "express"

import * as data from "../data"
import { issueToken } from "../tokens"
import { BUGOUT_POEMS_JOURNAL_ID } from "../settings"
import { bugoutClient, headerAuthToken } from "../utils"
import { logger, loggingMiddleware } from "../logging"

export const poemsAPI = express.Router()

poemsAPI.post("/", async (req, res, next) => {
    /*
    Create Vogon poem.
    */
    if (req.header("Content-Type") !== "application/json") {
        return res.status(400).send({
            error: 'This endpoint requires the following header: "Content-Type: application/json"',
        })
    }
    const token = headerAuthToken(req)
    if (token === null) {
        return res.status(400).send({
            error: "Access token should be provided",
        })
    }
    const poem: data.Poem = req.body

    bugoutClient
        .createEntry(token, BUGOUT_POEMS_JOURNAL_ID, poem.title, poem.poem, [
            `poet:${poem.poet}`,
        ])
        .then((response: BugoutTypes.BugoutJournalEntry) => {
            poem.id = response.id
            return res.send(poem)
        })
        .catch((err) => {
            logger.error({ err }, "Could not create poem")
            return res.status(err.response.status).send({
                error: err.response.data.detail.detail,
            })
        })
})

poemsAPI.post("/:poemId/token", async (req, res, next) => {
    /*
    Issue token for Vogon poem.
    */
    const token = headerAuthToken(req)
    if (token === null) {
        return res.status(400).send({
            error: "Access token should be provided",
        })
    }
    const poemId = req.params.poemId

    // TODO: Check if token not issued to this poem
    const { tokenPublicKeyStr, tokenAccountPubkeyStr } = await issueToken()
    const poem: data.Poem = { id: poemId, token: tokenPublicKeyStr }

    bugoutClient
        .createTags(token, BUGOUT_POEMS_JOURNAL_ID, poemId, [
            `token:${tokenPublicKeyStr}`,
        ])
        .then((response: string[]) => {
            return res.send(poem)
        })
        .catch((err) => {
            logger.error({ err }, "Could not issue token for poem")
            return res.status(err.response.status).send({
                error: err.response.data.detail.detail,
            })
        })
})

poemsAPI.get("/:poemId", async (req, res, next) => {
    /*
    Get Vogon poem.
    */
    const token = headerAuthToken(req)
    if (token === null) {
        return res.status(400).send({
            error: "Access token should be provided",
        })
    }
    const poemId = req.params.poemId
    bugoutClient
        .getEntry(token, BUGOUT_POEMS_JOURNAL_ID, poemId)
        .then((response: BugoutTypes.BugoutJournalEntry) => {
            const poetList = response.tags.filter((tag) =>
                tag.startsWith("poet:")
            )
            const poet = poetList.length > 0 ? poetList[0] : undefined
            const tokenPublicKeyStrList = response.tags.filter((tag) =>
                tag.startsWith("token:")
            )
            const tokenPublicKeyStr =
                tokenPublicKeyStrList.length > 0
                    ? tokenPublicKeyStrList[0]
                    : undefined
            const poem: data.Poem = {
                id: response.id,
                poet: poet,
                title: response.title,
                poem: response.content,
                token: tokenPublicKeyStr,
            }
            return res.send(poem)
        })
        .catch((err) => {
            logger.error({ err }, "Could not get poem")
            return res.status(err.response.status).send({
                error: err.response.data.detail.detail,
            })
        })
})

poemsAPI.get("/", async (req, res, next) => {
    /*
    Get list of Vogon poem.
    */
    const token = headerAuthToken(req)
    if (token === null) {
        return res.status(400).send({
            error: "Access token should be provided",
        })
    }
    bugoutClient
        .getEntries(token, BUGOUT_POEMS_JOURNAL_ID)
        .then((response: BugoutTypes.BugoutJournalEntries) => {
            let poems: data.Poem[] = []
            response.entries.forEach((entry) => {
                const poetList = entry.tags.filter((tag) =>
                    tag.startsWith("poet:")
                )
                const poet = poetList.length > 0 ? poetList[0] : undefined
                const tokenPublicKeyStrList = entry.tags.filter((tag) =>
                    tag.startsWith("token:")
                )
                const tokenPublicKeyStr =
                    tokenPublicKeyStrList.length > 0
                        ? tokenPublicKeyStrList[0]
                        : undefined
                poems.push({
                    id: entry.id,
                    poet: poet,
                    title: entry.title,
                    poem: entry.content,
                    token: tokenPublicKeyStr,
                })
            })

            return res.send(poems)
        })
        .catch((err) => {
            logger.error({ err }, "Could not get poems")
            return res.status(err.response.status).send({
                error: err.response.data.detail.detail,
            })
        })
})
