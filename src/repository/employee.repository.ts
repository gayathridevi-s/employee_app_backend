import { DataSource, Repository } from "typeorm";
import Employee from "../entity/employee.entity";
import dataSource from "../db/postgres.db";
import { CreateEmployeeDto } from "../dto/create-employee.dto";

class EmployeeRepository {
  
    constructor(private employeeRepository:Repository<Employee>) {
       
    }
 
    findAllEmployees(): Promise<Employee[]> {
        
        return this.employeeRepository.find({
            relations:{
                address:true
            }
        });
    }

    findAnEmployeeById(id: number): Promise<Employee | null> {
       
        return this.employeeRepository.findOne(
            {
                where:{id:id},
                relations:{
                    address:true
                },
                
            }
        );
    }


    findAnEmployeeByUsername(username: string): Promise<Employee> {
       
        return this.employeeRepository.findOne(
            {
                where:{username},                
            }
        );
    }
    saveEmployee(employee:Employee):Promise<Employee> {
        
        return this.employeeRepository.save(employee);
    }
   deleteEmployee(employee:Employee):Promise<Employee>{
 return this.employeeRepository.softRemove(employee);
    }
}
export default EmployeeRepository;