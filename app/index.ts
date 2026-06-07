import "dotenv/config";
import { createClient } from 'redis';
import type { Task , Details } from './lib/type';
import { verdict, Lang } from "@prisma/client"; 
import express from "express";
import {prisma} from "./db/prisma.js" ;
import { authMiddleware } from "./middleware/index.js" ;
import jwt from "jsonwebtoken" ;


const app = express();
const PORT : number = 8000;
const JWT_SECRET :string  = process.env.JWT_SECRET || "";
const client = createClient(
    { url: 'redis://localhost:6379' }
);

app.use(express.json());
 
app.post("/signup" , async (req , res)=>{
    const {username , email , password} : Details = req.body ; 
    try{
        const user = await prisma.user.findFirst({
            where :{
                email : email
            }
        }); 
        if(user){
            return res.status(400).json({
                message :"User already exists with this email"
            }); 
        }
        const response = await prisma.user.create({
            data :{
                username : username , 
                email : email , 
                password : password 
            }
        }); 
        const token = jwt.sign({userId : response.id , username : response.username, email : response.email} , JWT_SECRET ) ; 
        return res.status(201).json({
            message : "User created",
            token :"Bearer " + token
        })
    }catch(e){
        return res.status(500).json({
            message : "Error while signin up!, Try again later"
        })
    }
}); 


app.post("/signin" , authMiddleware , async (req , res)=>{
    const {email , uid , username } : {
        email : string , 
        uid : number , 
        username : string 
    } = req.body ;
    return res.status(200).json({
        message : "Welcome back " + username 
    }) 
}) ; 



app.post("/submit", authMiddleware , async (req, res) => {
    const task: Task = req.body;
    console.log(process.env.DATABASE_URL);
    const { username, email , uid  } = req.body;
    console.log("user email" + email) ; 
    try {
        const response = await prisma.submission.create({
            data: {
                sourceCode: task.code,
                userId:  uid ,
                verdict: verdict.PENDING,
                language: Lang.JAVA
            }
        });
        await client.lPush("task_queue", JSON.stringify(task));
        console.log("Submission queued for user " + username ) ; 
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message :"Error while submitting code!, Try again later"
        })
    }
    res.status(200).json({
        message: "Code submitted successfully"
    })
});

app.get("/submissions", authMiddleware , async (req , res)=>{
    const {username  , email , uid } : {
        username :string , 
        email : string , 
        uid : number 
    } = req.body ;  
    try{
        const submissions = await prisma.submission.findMany({
            where :{
                userId : uid 
            }
        }); 
        return res.status(200).json({
            submissions : submissions
        })
    }catch(e){
        console.log(e) ; 
        return res.status(500).json({
            message :"Failed to fetch submissions"
        })
    }
}); 


async function startServer() {
    try {
        await client.connect();
        console.log("Redis Connected successfully");
        app.listen(PORT, async () => {
            console.log("Server is running on port ", PORT);

        });
    } catch (e) {
        console.log("Error while connecting to Redis:", e);
    }
}




startServer(); 
