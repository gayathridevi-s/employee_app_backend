"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggerMiddleware = (req, res, next) => {
    console.log(`${new Date()}:${req.url}:${req.method}`);
    next();
};
exports.default = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map