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
const class_transformer_1 = require("class-transformer");
const express_1 = __importDefault(require("express"));
const create_employee_dto_1 = require("../dto/create-employee.dto");
const class_validator_1 = require("class-validator");
const http_exception_1 = __importDefault(require("../Exception/http.exception"));
const ValidationException_1 = require("../Exception/ValidationException");
const authenticate_middleware_1 = __importDefault(require("../middleware/authenticate.middleware"));
const authorize_middleware_1 = require("../middleware/authorize.middleware");
const role_enum_1 = require("../utils/role.enum");
class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
        this.getAllEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        });
        this.getEmployeeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeId = Number(req.params.id);
                const employee = yield this.employeeService.getEmployeeById(employeeId);
                res.status(200).send(employee);
            }
            catch (error) {
                next(error);
            }
        });
        this.createEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.validateInput(create_employee_dto_1.CreateEmployeeDto, req.body);
                // const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
                // const errors = await validate(createEmployeeDto);
                // if (errors.length > 0) {
                //     console.log(errors);
                //     throw new ValidationException(400, "Validation Exception", errors);
                // }
                const newEmployee = yield this.employeeService.createEmployee(req.body);
                res.status(200).send(newEmployee);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const name = req.body.name;
            const email = req.body.email;
            const id = Number(req.params.id);
            const newEmployee = yield this.employeeService.updateEmployee(id, name, email);
            res.status(200).send(newEmployee);
        });
        this.loginEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const token = yield this.employeeService.loginEmployee(email, password);
                res.status(200).send(token);
            }
            catch (error) {
                console.log(error instanceof http_exception_1.default);
                next(error);
            }
        });
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const employeeId = Number(req.params.id);
            yield this.employeeService.deleteEmployee(employeeId);
            res.status(204).send();
        });
        this.router = express_1.default.Router();
        this.router.get("/", authenticate_middleware_1.default, this.getAllEmployees);
        this.router.get("/:id", authenticate_middleware_1.default, this.getEmployeeById);
        this.router.post("/", authenticate_middleware_1.default, (0, authorize_middleware_1.authorizeRole)([role_enum_1.Role.DEVELOPER, role_enum_1.Role.UI]), this.createEmployee);
        this.router.put("/:id", this.updateEmployee);
        this.router.delete("/:id", this.deleteEmployee);
        this.router.post("/login", this.loginEmployee);
    }
    validateInput(classType, validateInput) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, class_transformer_1.plainToInstance)(classType, validateInput);
            const errors = yield (0, class_validator_1.validate)((0, class_transformer_1.plainToInstance)(classType, validateInput));
            if (errors.length > 0) {
                console.log(errors);
                // errors.forEach(error => {
                //     error.con
                // });
                throw new ValidationException_1.ValidationException(400, "Validation Exception", errors);
            }
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map