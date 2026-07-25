import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { TokenPayLoad } from "../lib/type";
export function authMiddleware(req : Request , res : Response , next : NextFunction){
    const authHeader =  req.headers.authorization ; 
    if(!authHeader){
        return res.status(401).json({
            message :"Unauthorized! , Create an account" 
        })
    }
    const token:string = authHeader.split(" ")[1] || "" ; 
    try{
        if(token){
            const decoded :TokenPayLoad = jwt.verify(token , process.env.JWT_SECRET as string) as TokenPayLoad ; 
            console.log(decoded) ;
            if(decoded.userId){
                req.body.uid = decoded.userId ;
                req.body.username = decoded.username ; 
                req.body.email = decoded.email ; 
                next() ; 
            }
        }
    }catch(e){
        return res.status(401).json({
            message :"Unauthorized!, Invalid token"
        })
    }
}