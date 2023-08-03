import { ValidationError } from "class-validator";
import HttpException from "./http.exception";

export class ValidationException extends HttpException{
    public status: number;
    public errors:ValidationError[];
    constructor(status:number,message:string,error:ValidationError[]){
        super(status,message);
        this.status=status;
        this.errors=error;
    }

}