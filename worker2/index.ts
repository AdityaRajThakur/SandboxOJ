import fs from 'node:fs/promises'; 
import path from 'node:path';
import { createClient } from "redis";
import {exec} from 'child_process' ;
const client = createClient({
    url: 'redis://localhost:6379'
});
interface Task{
    pid:number , 
    code :string , 
    uid : number , 
}
const tempDir = "../temp/submission" ; 
async function saveFile(dir : string , data : string , uid : number){
    const resolvePath = path.resolve(process.cwd() , dir)+`\\${uid}`; 
    try{
        await fs.mkdir(resolvePath , {recursive : true}); 
        await fs.writeFile(resolvePath+`\\code.java` , data) ; 
      //  console.log("File saved successfully at ", resolvePath);
    }catch(e){
        console.log("Error while create File" + e) ; 
    }
    return new Promise<string>((resolve)=>resolve(resolvePath)); 
}

async function submission(task : Task){
    
    const res:string = await saveFile(tempDir , task.code , task.uid) ; 
    if(res){
        
        const command = `docker run --rm --network none --memory="256m" --cpus="0.5" --pids-limit=64 --read-only --cap-drop=ALL --security-opt=no-new-privileges -v ${res}:/app java-runner:latest`

        //console.log("Code saved successfully for task:", task);
        exec(command , (error , stdout , stderr)=>{
            if(error) {
                console.log("Error while executing code for task " + task + " : " + error) ;
            }
            if(stderr){
                console.log("Error while executing code" + stderr) ; 
            }
            if(stdout){
                console.log("code executed successfully " + stdout) ; 
            }
        })
    }
    
}

async function worker() {
    try {
        await client.connect();
        console.log("Redis Connected successfully");
        while (true) {
            try {
                const res= await client.brPop("task_queue", 0)
                // console.log("Task received:", res);
                if(res){
                    const task : Task = JSON.parse(res.element) ;  
                    console.log("Processing task{worker2}:", task);
                 await submission(task) ; 
                    console.log("Task completed:", task);
                }
            } catch (e) {
                console.log("Error while processing task:", e);
            }
        }
    } catch (e) {
        console.log("Error while connecting to Redis:", e);
    }
}

worker(); 