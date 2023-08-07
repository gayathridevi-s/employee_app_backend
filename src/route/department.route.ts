import { DepartmentController } from "../controller/department.controller";
import dataSource from "../db/postgres.db";
import { Department } from "../entity/department.entity";
import { DepartmentRepository } from "../repository/department.repository";
import { DepartmentService } from "../service/department.service";

const repository=dataSource.getRepository(Department);
const departmentRepository=new DepartmentRepository(repository);
export const departmentService=new DepartmentService(departmentRepository);
const departmentController=new DepartmentController(departmentService);
const departmentRouter=departmentController.router;
 export default departmentRouter;
