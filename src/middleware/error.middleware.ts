import { NextFunction, Request, Response } from "express";
import HttpException from "../Exception/http.exception";
import { ValidationException } from "../Exception/ValidationException";

export const errorMidleWare = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error.stack)
    console.log(error instanceof HttpException);
    if (error instanceof ValidationException) {
        res.status(error.status).send({ error: error.message });
        return;
    } else if (error instanceof HttpException) {
        res.status(error.status).send({ error: error.message });
        return;
    } else {
        res.status(500).send(error.message);
        return;
    }
}