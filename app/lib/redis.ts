import "dotenv/config";
import { createClient, type RedisClientType } from 'redis';


class Redis{
    private static url: string ; 
    private static instance: RedisClientType  | null = null ;  
    private constructor(){
        Redis.url = process.env.REDIS_URL || "" ; 
    }
    static async getConnection():Promise<RedisClientType>{
        if(!Redis.instance){
            Redis.instance =  createClient({
                url : Redis.url 
            }); 

            Redis.instance.on("error" ,(err)=>{
                console.log("Error while conecting to Redis", err) ; 
            });

            Redis.instance.on("connect" ,()=>{
                console.log("Redis connected successfully") ; 
            }); 
            
            await Redis.instance.connect() ; 
        }
        return Redis.instance ;  
    }
}
export default Redis ; 
