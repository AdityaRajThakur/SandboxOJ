import "dotenv/config";
import {Router} from "express" ; 
import { verdict, Lang } from "@prisma/client"; 
import {prisma} from "../db/prisma.js" ;
import { authMiddleware } from "../middleware/index.js" ;
import jwt from "jsonwebtoken" ;
import type { Task , Details } from '../lib/type.js';
import Redis from "../lib/redis.js" ;
const userRouter = Router() ; 
const JWT_SECRET :string  = process.env.JWT_SECRET || "";

userRouter.post("/signup" , async (req , res)=>{
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
        return res.status(200).json({
            message :"User account create successfully"
        })
    }catch(e){
        return res.status(500).json({
            message : "Error while signin up!, Try again later"
        })
    }
}); 


userRouter.post("/login" , async (req , res)=>{
    const {email , password  } : {
        email : string , 
        password : string 
    } = req.body ;
    const user = await prisma.user.findFirst({
        where : {
            email : email 
        }, 
        select : {
            id : true , 
            username : true , 
            email : true ,
            password : true 
        }
    })
    if(!user){
        return res.status(400).json({
            message : "user not found" 
        })
    }
    if(user.password !==password){
        return res.status(400).json({
            message :"Invalid Credentials"
        })
    }
    const token = jwt.sign({userId : user.id , username : user.username, email : user.email} , JWT_SECRET ) ; 
    return res.status(201).json({
        message : "User created",
        token :"Bearer " + token,
        user : {
            id : user.id , 
            username: user.username,
            email : user.email
        }
    })
}) ; 



userRouter.post("/submit", authMiddleware , async (req, res) => {
    const client = await Redis.getConnection() ; 
    const task: { code : string , input : string} = req.body;
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

userRouter.get("/submissions", authMiddleware , async (req , res)=>{
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





export default userRouter ; 