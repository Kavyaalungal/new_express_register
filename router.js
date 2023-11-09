import { Router } from "express";

import * as userHandlers from "./requesthandlers.js";
import auth from "./middleware/auth.js";

const router = Router()

router.route("/register").post(userHandlers.register);
router.route("/login").post(userHandlers.login);
router.route("/profile").get(auth,userHandlers.profile);
router.route("/addNote").post(auth,userHandlers.addNote);

export default router;
