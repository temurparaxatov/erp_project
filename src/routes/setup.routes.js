import express from "express"
import { setupController } from "../controllers/index.js"

export const setupRouter= express.Router()

setupRouter.post("/", setupController)