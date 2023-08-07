import { NextFunction, Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import HttpException from "../Exception/http.exception";
export const authorizeRole=(roles:Role[])=>{
   return  (
        req:RequestWithUser,
        res:Response,
        next:NextFunction
    )=>{
        try{
            const role=req.role;
            if(!roles.includes(role)){
                throw new HttpException(403,"you are not authorized to do this");
            }
            next();
    
        }
            catch(error){
                next(error)
            }
        }
}



