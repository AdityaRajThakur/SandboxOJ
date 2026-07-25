export interface Task{
    code :string ,
    uid : number, 
    username : string , 
    email : string , 
    input : string
}

export interface Details{
    username : string ,
    password :string , 
    email :string 
}

export interface TokenPayLoad{
    userId : number , 
    username : string ,
    email :string 
}