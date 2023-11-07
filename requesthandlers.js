import bcrypt from "bcrypt";
import userSchema from "./Schema/user.schema.js"






export async function register(req,res){
    try {
        let {username, password} = req.body;
        if(username.length < 4 && password.length < 4){
            return res.json("Invalid username or password");
        }
        let userExist = await userSchema.findOne({username});
        let hashedpass = await bcrypt.hash(password,10);
        if(userExist){
            return res.status(401).send("User already exists");
        }
        let result = await userSchema.create({username, password: hashedpass});
        return res.status(200).send("Registration successful!");
        
    } catch (error) {
        console.log(error);
       res.status(500).send("Error");
        
    }
 }