import { NextFunction, Request, Response } from "express"
import { logger } from "../utils/logger";

const loggerMiddleware=(req:Request,res:Response,next: NextFunction)=>{
logger.info(`${new Date()}:${req.url}:${req.method}`);
next();
}
export default loggerMiddleware;