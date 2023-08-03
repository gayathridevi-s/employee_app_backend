import { NextFunction, Request, Response } from "express";
import HttpException from "../Exception/http.exception";

export const errorMidleWare = (error: Error, req:Request,res:Response,next: NextFunction) =>{
    console.error(error.stack)
   if(error instanceof HttpException){
res.status(error.status).send({error:error.message});
   }
    res.status(500).send(error.message);
}