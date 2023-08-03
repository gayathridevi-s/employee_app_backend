"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const employee_route_1 = __importDefault(require("./route/employee.route"));
const logger_middleware_1 = __importDefault(require("./middleware/logger.middleware"));
const postgres_db_1 = __importDefault(require("./db/postgres.db"));
const error_middleware_1 = require("./middleware/error.middleware");
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(logger_middleware_1.default);
server.use("/employees", employee_route_1.default);
server.use(error_middleware_1.errorMidleWare);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield postgres_db_1.default.initialize();
    server.listen(4000, () => {
        console.log("server is listening to 3000");
    });
}))();
//# sourceMappingURL=app.js.map