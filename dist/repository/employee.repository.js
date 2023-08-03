"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmployeeRepository {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    findAllEmployees() {
        return this.employeeRepository.find({
            relations: {
                address: true
            }
        });
    }
    findAnEmployeeById(id) {
        return this.employeeRepository.findOne({
            where: { id: id },
            relations: {
                address: true
            },
        });
    }
    saveEmployee(createEmployeeDto) {
        return this.employeeRepository.save(createEmployeeDto);
    }
    deleteEmployee(employee) {
        return this.employeeRepository.softRemove(employee);
    }
}
exports.default = EmployeeRepository;
//# sourceMappingURL=employee.repository.js.map