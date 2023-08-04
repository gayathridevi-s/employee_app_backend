import { ValidationError } from "class-validator";
import HttpException from "./http.exception";

export class ValidationException extends HttpException{
    public status: number;
    public errors: Object;
    constructor(status:number,message:string,errors:ValidationError[]){
        super(status,message);
        this.status=status;
        this.errors = this.generateErrorObject(errors);
    }
    private generateErrorObject(errors: ValidationError[]) {
        let errorObject: Object = {};

        for (const error of errors) {
            const property = error.property;
            const constraints = error.constraints;
            
            if (error.children.length > 0) {
                errorObject[property] = this.generateErrorObject(error.children);
            } else {
                errorObject[property] = Object.values(constraints);
            }
        }

        return errorObject;
    }

}