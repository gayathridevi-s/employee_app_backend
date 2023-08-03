"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMidleWare = void 0;
const http_exception_1 = __importDefault(require("../Exception/http.exception"));
const errorMidleWare = (error, req, res, next) => {
    console.error(error.stack);
    if (error instanceof http_exception_1.default) {
        res.status(error.status).send({ error: error.message });
    }
    res.status(500).send(error.message);
};
exports.errorMidleWare = errorMidleWare;
//# sourceMappingURL=error.middleware.js.map