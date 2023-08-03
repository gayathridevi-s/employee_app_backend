import { plainToInstance } from "class-transformer";
import EmployeeService from "../service/employee.service";
import express, { NextFunction } from "express";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import HttpException from "../Exception/http.exception";
class EmployeeController{
    public router:express.Router;
   
    constructor(private employeeService:EmployeeService){
        this.router=express.Router();
       

        this.router.get("/",this.getAllEmployees);
        this.router.get("/:id",this.getEmployeeById);
        this.router.post("/",this.createEmployee);
        this.router.put("/:id",this.updateEmployee);
        this.router.delete("/:id",this.deleteEmployee)
    }
    
    getAllEmployees=async(req:express.Request,res:express.Response)=>{
        const employees=await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }
   

    getEmployeeById=async(req:express.Request,res:express.Response,next: NextFunction)=>{
        try {
            const employeeId=Number(req.params.id);
        const employee=await this.employeeService.getEmployeeById(employeeId);
        res.status(200).send(employee);
        } catch (error) {
            next(error);
        }
        
    }
    createEmployee=async(req:express.Request,res:express.Response,next:NextFunction)=>{
        try{
            const createEmployeeDto=plainToInstance(CreateEmployeeDto, req.body);
            const errors=await validate(createEmployeeDto);
            if(errors.length > 0){
                console.log(errors);
                throw new HttpException(400,JSON.stringify(errors));
            }
            const newEmployee= await this.employeeService.createEmployee(req.body);
            res.status(200).send(newEmployee);
    }
        catch(error){
            next(error);
        }
    }
updateEmployee=async(req:express.Request,res:express.Response)=>{
    const name=req.body.name;
    const email=req.body.email;
    const id=Number(req.params.id);
    const newEmployee= await this.employeeService.updateEmployee(id,name,email);
    res.status(200).send(newEmployee);
}
deleteEmployee=async(req:express.Request,res:express.Response)=>{
    const employeeId=Number(req.params.id);
    await this.employeeService.deleteEmployee(employeeId);
    res.status(204).send();
}
}
export default EmployeeController;