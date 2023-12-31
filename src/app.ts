import * as dotenv from "dotenv";
dotenv.config({path:__dirname+"/.env"})
import "reflect-metadata"
import express from "express";
import employeeRouter from "./route/employee.route";
import loggerMiddleware from "./middleware/logger.middleware";
import dataSource from "./db/postgres.db";
import HttpException from "./Exception/http.exception";
import { errorMidleWare } from "./middleware/error.middleware";
import departmentRouter from "./route/department.route";
import roleRouter from "./route/role.route";
const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use("/employees", employeeRouter);
server.use("/department", departmentRouter);
server.use("/roles", roleRouter);
server.use(errorMidleWare);

(async() => {
    await dataSource.initialize();
    server.listen(4000, () => {
        console.log("server is listening to 3000")
    
    });
})();

