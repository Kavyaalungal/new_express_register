import bcrypt from "bcrypt";
import userSchema from "./Schema/user.schema.js";
import notesSchema from "./Schema/notes.schema.js";

import jwt from "jsonwebtoken";

const { sign } = jwt;






export async function register(req,res){
    try {
        let {username, password, email,phone} = req.body;
        if(username.length < 4 && password.length < 4){
            return res.json("Invalid username or password");
        }
        let userExist = await userSchema.findOne({username});
        let hashedpass = await bcrypt.hash(password,10);
        if(userExist){
            return res.status(401).send("User already exists");
        }
        let result = await userSchema.create({username, password: hashedpass,email,phone});
        return res.status(200).send("Registration successful!");
        
    } catch (error) {
        console.log(error);
       res.status(500).send("Error");
        
    }
 }

 export async function login(req, res){
    try {
        let {username,password} = req.body;
        if(username.length < 4 && password.length < 4){
            return res.json("Invalid username or password");
        }
        let user = await userSchema.findOne({username});
        if(!user){
            return res.status(403).send("Invalid username or password");
        }
        let passCheck = await bcrypt.compare(password, user.password)
        if(passCheck){
            let token = await sign({
                username: user.username,
                id:user._id
            },
            process.env.SECRET_KEY,
            {
                expiresIn:"24h"
            })
            return res.status(200).json({
                msg:"Login successful",
                token:token
        })
        }
        return res.status(403).send("inavlid username or password");        

        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
 }
export async function profile(req,res){
    try{
        let user = req.user;
        let userDetails = await userSchema.findOne({_id: user.id},{password:0});
        // Fetch user details including email and phone
let userDetails = await userSchema.findOne({ _id: user.id }, { password: 0, _id: 0 });

        if(userDetails){
            return res.json(userDetails);
        }
        return res.status(404).send("User not found");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
 }
export async function addNote(req,res){
    try{
        let { note }= req.body;
        let { id } = req.user;
        let result = await notesSchema.create({
            note,
            userId:id
        })
        res.json("note added successfully");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
 }
 export async function getNote(req,res){
    try {
        let { id } = req.user;
        let result = await notesSchema.find({userId: id})
        console.log(result);
        if(result.length>0){
            return res.status(200).send(result);
        }
        return res.status(200).send({msg : "NO notes to show"});
    } catch (error) {
        console.log(error);
        res.status(500).send("error");
    }
 }
export async function updateDetails(req, res) {
    try {
        let { email, phone } = req.body;
        let userId = req.user.id;

        // Update the user details in the database
        await userSchema.updateOne({ _id: userId }, { email, phone });

        res.status(200).send("User details updated successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating user details");
    }
}
