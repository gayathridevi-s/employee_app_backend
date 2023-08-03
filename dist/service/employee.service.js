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
Object.defineProperty(exports, "__esModule", { value: true });
const not_found_exception_1 = require("../Exception/not-found.exception");
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
    }
    getAllEmployees() {
        return this.employeeRepository.findAllEmployees();
    }
    createEmployee(createEmployeeInput) {
        return this.employeeRepository.saveEmployee(createEmployeeInput);
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