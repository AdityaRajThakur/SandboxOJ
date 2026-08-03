
import { createClient } from 'redis';
import express from "express";
import cors from "cors" ; 
import userRouter from "./routes/userRoutes.js" ; 
const app = express();
const PORT : number = 8000;
// const client = createClient(
//     { url: 'redis://localhost:6379' }
// );

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "", 
    methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
    credentials: true
}));


app.use("/", userRouter) ; 


async function startServer() {
    try {
        //console.log("Redis Connected successfully");
        app.listen(PORT, async () => {
            console.log("Server is running on port ", PORT);

        });
    } catch (e) {
        console.log("Error while connecting to Redis:", e);
    }
}




startServer(); 
