import { Repository } from "typeorm/repository/Repository";
import Employee from "../entity/employee.entity";
import { Department } from "../entity/department.entity";

export class DepartmentRepository{

    constructor(private departmentRepository: Repository<Department>) {

        }
         findAllDepartments(): Promise<Department[]> {
            return  this.departmentRepository.find({
            });
        }
        findDepartmentById(id: number): Promise<Department | null> {
            return this.departmentRepository.findOne({
                where: {
                    id: id,
                },
            });
        }

    saveDepartment(department: Department): Promise<Department> {
        return this.departmentRepository.save(department);
    }

    deleteDepartment(department: Department): Promise<Department> {
        return this.departmentRepository.softRemove(department);
    }

    }
