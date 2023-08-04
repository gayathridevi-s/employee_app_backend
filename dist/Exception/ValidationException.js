"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const http_exception_1 = __importDefault(require("./http.exception"));
class ValidationException extends http_exception_1.default {
    constructor(status, message, errors) {
        super(status, message);
        this.status = status;
        this.errors = this.generateErrorObject(errors);
    }
    generateErrorObject(errors) {
        let errorObject = {};
        for (const error of errors) {
            const property = error.property;
            const constraints = error.constraints;
            if (error.children.length > 0) {
                errorObject[property] = this.generateErrorObject(error.children);
            }
            else {
                errorObject[property] = Object.values(constraints);
            }
        }
        return errorObject;
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=ValidationException.js.map