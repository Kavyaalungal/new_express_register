import { Router } from "express";

import * as userHandlers from "./requesthandlers.js";

const router = Router()

router.route("/register").post(userHandlers.register)

export default router;