"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const http_exception_1 = __importDefault(require("../Exception/http.exception"));
const authorizeRole = (roles) => {
    return (req, res, next) => {
        try {
            const role = req.role;
            if (!roles.includes(role)) {
                throw new http_exception_1.default(403, "you are not allowed to create employee");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authorizeRole = authorizeRole;
//# sourceMappingURL=authorize.middleware.js.map