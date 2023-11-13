import { Router } from "express";
import multer from "multer";

import path from "path";

import * as userHandlers from "./requesthandlers.js";
import auth from "./middleware/auth.js";


const storage = multer.diskStorage({
    destination:"./files",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});


const upload = multer({ storage: storage });

const router = Router()

router.route("/register").post(userHandlers.register);
router.route("/login").post(userHandlers.login);
router.route("/profile").get(auth,userHandlers.profile);
router.route("/add-note").post(auth,userHandlers.addNote);
router.route("/get-note").get(auth,userHandlers.getNote);
router.route("/update-details").put(auth, userHandlers.updateDetails);


router.route("/file").post(upload.array("myfile",4),(req,res)=>{

    console.log(req.files);
    res.json("files stored");
})


router.route("/get-file/:file").get((req,res)=>{
    let fileName = req.params;
    res.sendFile(path.resolve(`./files/${fileName.file}`))
})

export default router;


