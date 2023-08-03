import express from "express";
import Employee from "./Employee";
import dataSource from "./data-source";
import { FindOptionsWhere, Like } from "typeorm";
const employeeRouter = express.Router();



employeeRouter.get('/', async(req, res) => {


    const nameFilter=req.query.name;
    const emailFilter=req.query.email;

    // const filters:FindOptionsWhere<Employee>={};
    // if(nameFilter ||emailFilter){
    //     filters.name= Like("%" + nameFilter as string + "%")
    //     filters.email= Like("%" + emailFilter as string + "%")
    // }
    const employeeRepositary=dataSource.getRepository(Employee);
    const qb=employeeRepositary.createQueryBuilder();
    if(nameFilter){
        qb.andWhere("name LIKE :name",{ name:`%${nameFilter}%`});
    }
    if(emailFilter){
        qb.andWhere("email LIKE :email",{ email:`%${emailFilter}%`});
    }
  const employees =await qb.getMany();
   
    // const employee =await employeeRepositary.find({
    //     where:
    //        filters
    // });
   
    res.status(200).send(employees);
})

employeeRouter.get('/:id', async(req, res) => {
  
    const employeeRepositary=dataSource.getRepository(Employee);
    const employee =await employeeRepositary.findOneBy({
        id:Number(req.params.id)
    })
      console.log(employee);
      res.status(200).send(employee)
      
})

employeeRouter.post('/', async(req, res) => {

    console.log("Booooooody",req.body);
    const newEmployee=new Employee();
    newEmployee.email=req.body.email;
    newEmployee.name=req.body.name;
    const employeeRepositary=dataSource.getRepository(Employee);
    const employee =await employeeRepositary.save(newEmployee);
   

  
    res.status(200).send(newEmployee);
})
employeeRouter.delete('/:id', async(req, res) => {

    console.log(req.url);

    const id: number = Number(req.params.id);
    const employeeRepositary=dataSource.getRepository(Employee);
    const employee: Employee =await employeeRepositary.findOneBy({
        id:Number(req.params.id)
    })
    await employeeRepositary.softRemove(employee);
    res.status(204).send("employee deleted");
})

employeeRouter.put('/:id', async(req, res) => {
    const body = req.body;
    const id: number = Number(req.params.id);
    
    const employeeRepositary=dataSource.getRepository(Employee);
    const employee: Employee =await employeeRepositary.findOneBy({
        id:Number(req.params.id)
    })
    employee.name = body.name;
    employee.email=body.email;
     const updatedEmployee =await employeeRepositary.save(employee);
     res.status(201).send(updatedEmployee);

})




export default employeeRouter;