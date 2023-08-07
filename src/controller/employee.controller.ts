import { plainToInstance } from "class-transformer";
import EmployeeService from "../service/employee.service";
import express, { NextFunction } from "express";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { ValidationError, validate } from "class-validator";
import HttpException from "../Exception/http.exception";

import { error } from "console";
import authenticate from "../middleware/authenticate.middleware";
import { authorizeRole } from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { LoginEmployeeDto } from "../dto/login-employee.dto";
import ValidationException from "../Exception/ValidationException";
import { responseFormatter } from "../utils/response.formatter";

class EmployeeController {
    public router: express.Router;

    constructor(private employeeService: EmployeeService) {
        this.router = express.Router();


        this.router.get("/", authenticate, this.getAllEmployees);
        this.router.get("/:id", authenticate, this.getEmployeeById);
        this.router.post("/", authenticate, authorizeRole([Role.ADMIN]), this.createEmployee);
        this.router.put("/:id", authenticate, this.updateEmployee);
        this.router.delete("/:id", authenticate, this.deleteEmployee);
        this.router.post("/login", this.loginEmployee);
        this.router.patch("/:id", authenticate, authorizeRole([Role.ADMIN]), this.patch)
    }



    getAllEmployees = async (req: express.Request, res: express.Response) => {
        const employees = await this.employeeService.getAllEmployees();

        res.status(200).send(responseFormatter(employees));
    }


    getEmployeeById = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            const employeeId = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(employeeId);
            res.status(200).send(responseFormatter(employee));
        } catch (error) {
            next(error);
        }

    }


    createEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            await this.validateInput(CreateEmployeeDto, req.body);
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);

            const newEmployee = await this.employeeService.createEmployee(createEmployeeDto);
            res.status(200).send(responseFormatter(newEmployee));
        }
        catch (error) {
            next(error);
        }
    }
    updateEmployee = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            await this.validateInput(UpdateEmployeeDto, req.body);
            const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);

            const id = Number(req.params.id);
            const newEmployee = await this.employeeService.updateEmployee(id, updateEmployeeDto);
            res.status(200).send(responseFormatter(newEmployee));
        } catch (error) {
            next(error)
        }

    }

    patch = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            await this.validateInput(UpdateEmployeeDto, req.body);
            const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);

            const id = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(id);
            await this.employeeService.patch(id, updateEmployeeDto);
            res.status(200).send(responseFormatter(employee));
        } catch (error) {
            next(error)
        }

    }


    public loginEmployee = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            await this.validateInput(LoginEmployeeDto, req.body);
            const loginEmployeeDto = plainToInstance(LoginEmployeeDto, req.body);
            const { token, employeeDetails } = await this.employeeService.loginEmployee(loginEmployeeDto);
            const responseData = {
                token,
                employeeDetails ,
            };

            res.status(200).send(responseFormatter(responseData));
        } catch (error) {
            console.log(error instanceof HttpException);
            next(error);
        }
    };

    // public loginEmployee = async (
    //     req: express.Request,
    //     res: express.Response,
    //     next: express.NextFunction
    //   ) => {
    //     try {
    //       await this.validateInput(LoginEmployeeDto, req.body);
    //       const loginEmployeeDto = plainToInstance(LoginEmployeeDto, req.body);
    //       const token = await this.employeeService.loginEmployee(loginEmployeeDto);


    //       const employeeDetails = await this.employeeService.getEmployeeById(
    //         loginEmployeeDto.
    //       );

    //       // Check if the employee details were found
    //       if (!employeeDetails) {
    //         throw new HttpException("Employee not found", 404);
    //       }

    //       // Format the response
    //       const responseData = {
    //         token,
    //         employeeDetails,
    //       };

    //       res.status(200).send(responseFormatter(responseData));
    //     } catch (error) {
    //       console.log(error instanceof HttpException);
    //       next(error);
    //     }
    //   };

    deleteEmployee = async (req: express.Request, res: express.Response,) => {
        try {
            const employeeId = Number(req.params.id);
            await this.employeeService.deleteEmployee(employeeId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }


    }

    private async validateInput(classType: any, validateInput: any) {
        // plainToInstance(classType, validateInput);
        const errors: ValidationError[] = await validate(plainToInstance(classType, validateInput));
        if (errors.length > 0) {
            console.log(errors);

            throw new ValidationException(errors);
        }


    }

}

export default EmployeeController;

function next(error: any) {
    throw new Error("Function not implemented.");
}
