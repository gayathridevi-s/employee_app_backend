import HttpException from "../Exception/http.exception";
import CreateDepartmentDto from "../dto/create-department.dto";
import UpdateDepartmentDto from "../dto/update-department.dto";
import { Department } from "../entity/department.entity";
import { DepartmentRepository } from "../repository/department.repository";

export class DepartmentService{
    constructor(private departmentRepository: DepartmentRepository) { }

    getAllDepartments(): Promise<Department[]> {
        return this.departmentRepository.findAllDepartments();
    }

    async getDepartmentById(id: number): Promise<Department | null> {
        const department = await this.departmentRepository.findDepartmentById(id);
        if (!department) {
            throw new HttpException(404, "Department not found");
        }
        return department;
    }

    createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        const name = createDepartmentDto.name;
        const newDepartment = new Department()
        newDepartment.name = name;
        return this.departmentRepository.saveDepartment(newDepartment);
    }

    async updateDepartment(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<void> {
        const department = await this.getDepartmentById(id);
        department.name = updateDepartmentDto.name;
        this.departmentRepository.saveDepartment(department);
    }
    async deleteDepartment(id: number) {
        const department = await this.getDepartmentById(id);
        this.departmentRepository.deleteDepartment(department);
    }
}