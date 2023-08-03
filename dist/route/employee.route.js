"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_controller_1 = __importDefault(require("../controller/employee.controller"));
const postgres_db_1 = __importDefault(require("../db/postgres.db"));
const employee_entity_1 = __importDefault(require("../entity/employee.entity"));
const employee_repository_1 = __importDefault(require("../repository/employee.repository"));
const employee_service_1 = __importDefault(require("../service/employee.service"));
const repository = postgres_db_1.default.getRepository(employee_entity_1.default);
const employeeRepository = new employee_repository_1.default(repository);
const employeeService = new employee_service_1.default(employeeRepository);
const employeeController = new employee_controller_1.default(employeeService);
const employeeRouter = employeeController.router;
exports.default = employeeRouter;
//# sourceMappingURL=employee.route.js.map