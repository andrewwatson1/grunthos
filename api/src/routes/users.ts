import { BugoutTypes } from "@bugout/bugout-js"
import express from "express"
import multer from "multer"

import { loggingMiddleware } from "../utils/logging"

// http://expressjs.com/en/5x/api.html#req.body
const upload = multer()

export const usersAPI = express.Router()
