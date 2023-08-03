"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const http_exception_1 = __importDefault(require("./http.exception"));
class NotFoundException extends http_exception_1.default {
    constructor(message) {
        super(404, message ? message : "not found");
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=not-found.exception.js.map