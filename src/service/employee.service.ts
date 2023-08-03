import { NOTFOUND } from "dns";
import HttpException from "../Exception/http.exception";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import { NotFoundException } from "../Exception/not-found.exception";
import { CreateEmployeeDto } from "../dto/create-employee.dto";

class EmployeeService {

    constructor(private employeeRepository: EmployeeRepository) {


    }
    getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findAllEmployees();
    }
    getEmployeeById=async(id: number): Promise<Employee | null> => {
        const employee= await this.employeeRepository.findAnEmployeeById(id);
        if(!employee){
            throw new NotFoundException(`Employee with id: ${id} not found`);
        }
        return employee;
    }
    createEmployee(createEmployeeInput: CreateEmployeeDto): Promise<Employee> {

        return this.employeeRepository.saveEmployee(createEmployeeInput);

    }
   async updateEmployee(id: number, name: string, email: string): Promise<Employee> {
      const employee = await this.employeeRepository.findAnEmployeeById(id);
      employee.name = name;
      employee.email = email;
    return this.employeeRepository.saveEmployee(employee);

    }
    async deleteEmployee(id:number):Promise<void>{
        const employee = await this.employeeRepository.findAnEmployeeById(id);
         await this.employeeRepository.deleteEmployee(employee);
    }
}
export default EmployeeService;