import { plainToInstance } from "class-transformer";
import CreateDepartmentDto from "../dto/create-department.dto";
import { validate } from "class-validator";

import express, { NextFunction, Router } from "express";
import { DepartmentService } from "../service/department.service";
import UpdateDepartmentDto from "../dto/update-department.dto";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import ValidationException from "../Exception/ValidationException";
import authenticate from "../middleware/authenticate.middleware";
import { authorizeRole } from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";

export class DepartmentController {
    public router: Router;
  
    constructor(private departmentService: DepartmentService) {
      this.router = express.Router();
      this.router.post("/", authenticate,authorizeRole([ Role.ADMIN]),this.createDepartment);
      this.router.put("/:id",authenticate,authorizeRole([ Role.ADMIN]),this.updateDepartment);
      this.router.delete("/:id",authenticate,authorizeRole([ Role.ADMIN]),this.deleteDepartment);
      this.router.get("/",authenticate, this.getAllDepartments);
      this.router.get("/:id",authenticate, this.getDepartmentByID);
    }
  
    createDepartment = async (
      req: express.Request,
      res: express.Response,
      next: NextFunction
    ) => {
      try {
        const createDepartmentDto = plainToInstance(
          CreateDepartmentDto,
          req.body
        );
        const errors = await validate(createDepartmentDto);
  
        if (errors.length > 0) {
          throw new ValidationException( errors);
        }
       
        const employee = await this.departmentService.createDepartment(createDepartmentDto);
        res.status(200).send(employee);
      } catch (err) {
        next(err);
      }
    };
  
    getAllDepartments = async (req: express.Request, res: express.Response) => {
      const employee = await this.departmentService.getAllDepartments();
      res.status(200).send(employee);
    };
  
    getDepartmentByID = async (
      req: express.Request,
      res: express.Response,
      next: NextFunction
    ) => {
      try {
        const employee = await this.departmentService.getDepartmentById(
          Number(req.params.id)
        );
        res.status(200).send(employee);
      } catch (error) {
        next(error);
      }
    };
  
    updateDepartment = async (
      req: express.Request,
      res: express.Response,
      next: NextFunction
    ) => {
      try {
        const { name } = req.body;
        const id = Number(req.params.id);
  
        const updateDepartmentDto = plainToInstance(
          UpdateDepartmentDto,
          req.body
        );
        const errors = await validate(updateDepartmentDto);
  
        if (errors.length > 0) {
          throw new ValidationException(errors);
        }
        const department = await this.departmentService.updateDepartment( id,updateDepartmentDto );
        res.status(201).send(department);
      } catch (err) {
        next(err);
      }
    };
  
    deleteDepartment = async (req: express.Request, res: express.Response) => {
      const id = Number(req.params.id);
      const employee = await this.departmentService.deleteDepartment(id);
      res.status(201).send(employee);
    };
  }