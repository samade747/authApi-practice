import express, { Router } from "express"
import { createNewUser } from "../controllers/user.controller.js"

const router = express.Router()

router.post("/create-user", createNewUser )
// router.delete("/remove-user", removeUser)

export default router