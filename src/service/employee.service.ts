import { NOTFOUND } from "dns";
import HttpException from "../Exception/http.exception";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import { NotFoundException } from "../Exception/not-found.exception";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken"
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { LoginEmployeeDto } from "../dto/login-employee.dto";

class EmployeeService {

    constructor(private employeeRepository: EmployeeRepository) {


    }
    getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findAllEmployees();
    }
    getEmployeeById = async (id: number): Promise<Employee | null> => {
        const employee = await this.employeeRepository.findAnEmployeeById(id);
        if (!employee) {
            throw new NotFoundException(`Employee with id: ${id} not found`);
        }
        return employee;
    }
    async createEmployee(createEmployeeInput: CreateEmployeeDto): Promise<Employee> {
        createEmployeeInput.password = await bcrypt.hash(createEmployeeInput.password, 10)
        return this.employeeRepository.saveEmployee(createEmployeeInput);

    }
    async updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        const employee = await this.employeeRepository.findAnEmployeeById(id);
        employee.name = updateEmployeeDto.name;
        employee.joiningDate = updateEmployeeDto.joiningDate;
        employee.experience = updateEmployeeDto.experience;
        employee.address = updateEmployeeDto.address;
        employee.status=updateEmployeeDto.status;
      //  if()
        return this.employeeRepository.saveEmployee(employee);
      }
      

    
    loginEmployee = async (loginEmployeeDto:LoginEmployeeDto) => {
        const employee = await this.employeeRepository.findAnEmployeeByUsername(loginEmployeeDto.username);
        if (!employee) {
            throw new HttpException(400, "employee not found");
        }
        const result = await bcrypt.compare(loginEmployeeDto.password, employee.password);
        if (!result) {
            throw new HttpException(401, "incorrect username or password");
        }
        const payload = {
            name: employee.name,
           username: employee.username,
            role: employee.role
        }
        return jsonwebtoken.sign(payload, "ABCDE", { expiresIn: "1h" });


    }
    async deleteEmployee(id: number): Promise<void> {
        const employee = await this.employeeRepository.findAnEmployeeById(id);
        await this.employeeRepository.deleteEmployee(employee);
    }
}

export default EmployeeService;