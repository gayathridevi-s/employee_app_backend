import { plainToInstance } from "class-transformer";
import EmployeeService from "../service/employee.service";
import express, { NextFunction } from "express";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { ValidationError, validate } from "class-validator";
import HttpException from "../Exception/http.exception";
import { ValidationException } from "../Exception/ValidationException";
import { error } from "console";
import authenticate from "../middleware/authenticate.middleware";
import { authorizeRole } from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();


        this.router.get("/",authenticate,this.getAllEmployees);
        this.router.get("/:id", authenticate,this.getEmployeeById);
        this.router.post("/",  authenticate,authorizeRole([Role.DEVELOPER,Role.UI]),this.createEmployee);
        this.router.put("/:id", this.updateEmployee);
        this.router.delete("/:id", this.deleteEmployee);
        this.router.post("/login", this.loginEmployee);
    }

    getAllEmployees = async (req: express.Request, res: express.Response) => {
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }


    getEmployeeById = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            const employeeId = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(employeeId);
            res.status(200).send(employee);
        } catch (error) {
            next(error);
        }

    }
    createEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            await this.validateInput(CreateEmployeeDto, req.body);
            // const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            // const errors = await validate(createEmployeeDto);
            // if (errors.length > 0) {
            //     console.log(errors);
            //     throw new ValidationException(400, "Validation Exception", errors);
            // }
            const newEmployee = await this.employeeService.createEmployee(req.body);
            res.status(200).send(newEmployee);
        }
        catch (error) {
            next(error);
        }
    }
    updateEmployee = async (req: express.Request, res: express.Response) => {
        // const name = req.body.name;
        // const email = req.body.email;
        const id = Number(req.params.id);
        const newEmployee = await this.employeeService.updateEmployee(id,req.body);
        res.status(200).send(newEmployee);
    }
    public loginEmployee = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) => {
        const { email, password } = req.body;
        try {
            const token = await this.employeeService.loginEmployee(email, password);
            res.status(200).send(token);
        } catch  (error)  {
            console.log(error instanceof HttpException)
            next(error);
        }
    }
    deleteEmployee = async (req: express.Request, res: express.Response,) => {
        const employeeId = Number(req.params.id);
        await this.employeeService.deleteEmployee(employeeId);
        res.status(204).send();
    }

    private async validateInput(classType: any, validateInput:any){
         plainToInstance(classType, validateInput);
         const errors: ValidationError[] = await validate(plainToInstance(classType, validateInput));
          if (errors.length > 0) {
                console.log(errors);
                // errors.forEach(error => {
                //     error.con
                // });
                throw new ValidationException(400, "Validation Exception", errors);
          }
    }

}

export default EmployeeController;