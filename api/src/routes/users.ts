import { BugoutTypes } from "@bugout/bugout-js"
import express from "express"
import multer from "multer"

import * as data from "../data"
import { BUGOUT_RESOURCE_APPLICATION_ID } from "../settings"
import { bugoutClient, headerAuthToken } from "../utils"

// http://expressjs.com/en/5x/api.html#req.body
const upload = multer()

export const usersAPI = express.Router()

usersAPI.get("/", async (req, res, next) => {
    /*
    Get user.
    */
    const token = headerAuthToken(req)
    if (token === null) {
        return res.status(400).send({
            error: "Access token should be provided",
        })
    }
    bugoutClient
        .getUser(token)
        .then((user_response: BugoutTypes.BugoutUser) => {
            const user: data.User = {
                id: user_response.id,
                username: user_response.username,
                email: user_response.email
            }
            bugoutClient
                .listResources(
                    token,
                    undefined,
                    BUGOUT_RESOURCE_APPLICATION_ID,
                    user_response.id
                )
                .then((resource_response: BugoutTypes.BugoutResources) => {
                    if (resource_response.resources.length === 1) {
                        const data = JSON.parse(
                            resource_response.resources[0].description
                        )
                        user.vogon_name = data.vogon_name
                        user.solana_address = data.solana_address
                        user.picture_path = data.picture_path
                    }
                    return res.send(user)
                })
                .catch((err) => {
                    return res.send(user)
                })
        })
        .catch((err) => {
            return res.status(err.response.status).send({
                error: err.response.data.detail,
            })
        })
})

usersAPI.post("/", upload.none(), async (req, res, next) => {
    /*
    User creation handler.
    */
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    bugoutClient
        .createUser(username, email, password)
        .then((user_response: BugoutTypes.BugoutUser) => {
            const user: data.User = {
                id: user_response.id,
                username: user_response.username,
                email: user_response.email
            }
            return res.send(user)
        })
        .catch((err) => {
            return res.status(err.response.status).send({
                error: err.response.data.detail,
            })
        })
})

usersAPI.post("/vogon", upload.none(), async (req, res, next) => {
    /*
    Create vogon for user, it requires to provide solana address.
    */
    const token = headerAuthToken(req)
    if (token === null) {
        return res.status(400).send({
            error: "Access token should be provided",
        })
    }
    if (!req.body.vogon_name || !req.body.solana_address || !req.body.picture_path) {
        return res.status(406).send({
            error: "All parameters should be provided: vogon_name, solana_address, picture_path",
        })
    }
    const data = {
        vogon_name: req.body.vogon_name,
        solana_address: req.body.solana_address,
        picture_path: req.body.picture_path
    }
    bugoutClient
        .getUser(token)
        .then((user_response: BugoutTypes.BugoutUser) => {
            bugoutClient
                .createResource(
                    token,
                    "vogon_users",
                    BUGOUT_RESOURCE_APPLICATION_ID,
                    JSON.stringify(data),
                    user_response.id
                )
                .then((resource_response: BugoutTypes.BugoutResource) => {
                    const user: data.User = {
                        id: user_response.id,
                        username: user_response.username,
                        email: user_response.email,
                        vogon_name: data.vogon_name,
                        solana_address: data.solana_address,
                        picture_path: data.picture_path
                    }
                    return res.send(user)
                })
                .catch((err) => {
                    return res.status(err.response.status).send({
                        error: err.response.data.detail,
                    })
                })
        })
        .catch((err) => {
            return res.status(err.response.status).send({
                error: err.response.data.detail,
            })
        })
})

usersAPI.post("/token", upload.none(), async (req, res, next) => {
    /*
    Login handler.
    */
    const username = req.body.username
    const password = req.body.password

    bugoutClient
        .createToken(username, password)
        .then((response: BugoutTypes.BugoutToken) => {
            return res.send(response)
        })
        .catch((err) => {
            return res.status(err.response.status).send({
                error: err.response.data.detail,
            })
        })
})

usersAPI.delete("/token", async (req, res, next) => {
    /*
    Revoke token handler.
    */
    const token = headerAuthToken(req)
    if (token === null) {
        return res.status(400).send({
            error: "Access token should be provided",
        })
    }
    bugoutClient
        .revokeToken(token)
        .then((response: string) => {
            return res.send(response)
        })
        .catch((err) => {
            return res.status(err.response.status).send({
                error: err.response.data.detail.detail,
            })
        })
})
