import "dotenv/config";
import { createClient } from 'redis';
import type { Task } from './lib/type';
import { verdict, Lang } from "@prisma/client"; 
import express from "express";
import {prisma} from "./db/prisma.js" ;



const app = express();
const PORT = 8000;
const client = createClient(
    { url: 'redis://localhost:6379' }
);

app.use(express.json());

app.post("/submit", async (req, res) => {
    const task: Task = req.body;
    console.log(process.env.DATABASE_URL);
    const { username, email, password } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        if (user.password !== password) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        const response = await prisma.submission.create({
            data: {
                sourceCode: task.code,
                userId: user.id,
                problemId: task.pid,
                verdict: verdict.PENDING,
                language: Lang.JAVA
            }
        });
        console.log("Submission queued for user " + user.username ) ; 
    } catch (e) {
        console.log(e);
    }
    await client.lPush("task_queue", JSON.stringify(task));
    res.status(200).json({
        message: "Code submitted successfully"
    })
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
