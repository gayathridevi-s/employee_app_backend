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
const http_exception_1 = __importDefault(require("../Exception/http.exception"));
const not_found_exception_1 = require("../Exception/not-found.exception");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
        this.getEmployeeById = (id) => __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findAnEmployeeById(id);
            if (!employee) {
                throw new not_found_exception_1.NotFoundException(`Employee with id: ${id} not found`);
            }
            return employee;
        });
        this.loginEmployee = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findAnEmployeeByEmail(email);
            if (!employee) {
                throw new http_exception_1.default(400, "employee not found");
            }
            const result = yield bcrypt_1.default.compare(password, employee.password);
            if (!result) {
                throw new http_exception_1.default(401, "incorrect username or password");
            }
            const payload = {
                name: employee.name,
                email: employee.email,
                role: employee.role
            };
            return jsonwebtoken_1.default.sign(payload, "ABCDE", { expiresIn: "1h" });
        });
    }
    getAllEmployees() {
        return this.employeeRepository.findAllEmployees();
    }
    createEmployee(createEmployeeInput) {
        return __awaiter(this, void 0, void 0, function* () {
            createEmployeeInput.password = yield bcrypt_1.default.hash(createEmployeeInput.password, 10);
            return this.employeeRepository.saveEmployee(createEmployeeInput);
        });
    }
    updateEmployee(id, name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findAnEmployeeById(id);
            employee.name = name;
            employee.email = email;
            return this.employeeRepository.saveEmployee(employee);
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findAnEmployeeById(id);
            yield this.employeeRepository.deleteEmployee(employee);
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map