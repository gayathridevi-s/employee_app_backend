import { verify } from "crypto";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken"
import { RequestWithUser } from "../utils/requestWithUser";
import { JwtPayload } from "../utils/jwtPayload.type";

const authenticate =async (
    req:RequestWithUser,
    res:Response,
    next:NextFunction
)=>{
    try{
const token =getTokenFromRequestHeader(req);
const payload:JwtPayload  =jsonwebtoken .verify(token,"ABCDE") as JwtPayload;
req.name=payload.name;
req.email=payload.email;
req.role=payload.role;
next();
    }catch(error){
        next(error);
    }
}
const getTokenFromRequestHeader =(req:RequestWithUser)=>{
    const bearerToken=req.header("Authorization");
    const token=bearerToken ? bearerToken.split(" ")[1]:"";
    return token;
}
export default authenticate;