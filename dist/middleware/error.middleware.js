"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMidleWare = void 0;
const http_exception_1 = __importDefault(require("../Exception/http.exception"));
const ValidationException_1 = require("../Exception/ValidationException");
const errorMidleWare = (error, req, res, next) => {
    console.error(error.stack);
    console.log(error instanceof http_exception_1.default);
    if (error instanceof ValidationException_1.ValidationException) {
        res.status(error.status).send({ error: error.message });
        return;
    }
    else if (error instanceof http_exception_1.default) {
        res.status(error.status).send({ error: error.message });
        return;
    }
    else {
        res.status(500).send(error.message);
        return;
    }
};
exports.errorMidleWare = errorMidleWare;
//# sourceMappingURL=error.middleware.js.map