import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import Employee from "../../entity/employee.entity";
import EmployeeService from "../../service/employee.service";
import { when } from "jest-when";
import { NotFoundException } from "../../Exception/not-found.exception";
import { DepartmentService } from "../../service/department.service";
import { plainToClass } from "class-transformer";
import Address from "../../entity/address.entity";
import { CreateEmployeeDto } from "../../dto/create-employee.dto";
import CreateAddressDto from "../../dto/create-address.dto";
import { DepartmentRepository } from "../../repository/department.repository";
import { Department } from "../../entity/department.entity";
import UpdateAddressDto from "../../dto/update-address.dto";
import { UpdateEmployeeDto } from "../../dto/update-employee.dto";
import { LoginEmployeeDto } from "../../dto/login-employee.dto";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken"
describe('employee service tests', () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    let departmentservice: DepartmentService;
    let departmentRepository: DepartmentRepository
    const employee: Employee = plainToClass(Employee, {
        id: 1,
        name: "Aromal",
        username: "aromal",
        password:"aromal",
        joiningDate: "2023-02-11",
        experience: 3,
        address: plainToClass(Address, {
            addressLine1: "kottayam",
            addressLine2: "cms",
        })
    });
    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee));
        departmentservice = new DepartmentService(departmentRepository);
        employeeService = new EmployeeService(employeeRepository, departmentservice);
        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department))


    }
    );
    describe('test for getEmployeeById', () => {
        test('test employee for id 1', async () => {
            // when(mockFunction).calledWith{id:1}).
            employeeRepository.findAnEmployeeById = jest.fn();
            when(employeeRepository.findAnEmployeeById).calledWith(1).mockResolvedValue(null);
            // const employee = await employeeService.getEmployeeById(1);
            expect(async () => { await employeeService.getEmployeeById(1) }).rejects.toThrowError();

        })

        test('to create aan employee successfully', async () => {
            const mockedFn = jest.fn()
            const mockedFn1 = jest.fn()

            employeeRepository.saveEmployee = mockedFn;
            departmentservice.getDepartmentById = mockedFn1;
            mockedFn.mockResolvedValue(employee);
            mockedFn1.mockResolvedValue(null);
            const createEmployeeDto: CreateEmployeeDto = plainToClass(CreateEmployeeDto, {
                name: "Aromal",
                username: "aromal",
                password: "aromal@123",
                joiningDate: "2023-02-11",
                experience: 3,
                address: plainToClass(CreateAddressDto, {
                    addressLine1: "kottayam",
                    addressLine2: "cms",
                })
            });
            const createdEemployee = await employeeService.createEmployee(createEmployeeDto);
            expect(createdEemployee).toStrictEqual(employee);

        })
    }
    )
    describe('test for updateEmployee', () => {

        test('to update an employee successfully', async () => {

           const findEmployeeByIdMockedFn=jest.fn()
            const saveEmployeeMockedFunction=jest.fn()
            employeeRepository.findAnEmployeeById = findEmployeeByIdMockedFn;

            findEmployeeByIdMockedFn.mockResolvedValue(employee); // return mock employee from DB
            employeeRepository.saveEmployee=saveEmployeeMockedFunction;

            const updateEmployeeDto: UpdateEmployeeDto= plainToClass(UpdateEmployeeDto, {
                name: "AAAAAAA",
                username: "aromal",
                joiningDate: "2023-02-11",
                experience: 3,
                address: plainToClass(UpdateAddressDto, {
                    addressLine1: "kottayam",
                    addressLine2: "cms",
                })
            });
            employee.name = "AAAAAAA"
            saveEmployeeMockedFunction.mockResolvedValue(employee)
            const result = await employeeService.updateEmployee(employee.id,updateEmployeeDto);
            expect(result).toStrictEqual(employee);

        })}
    )
   
    describe('test for getAllEmployee', () => {

        test('to get all employee successfully', async () => {
            const mockedFn = jest.fn()
            employeeRepository.findAllEmployees = mockedFn;
            mockedFn.mockResolvedValue(employee);
            const getEmployees = await employeeService.getAllEmployees();
            expect(getEmployees).toStrictEqual(employee);
           
    }
    )
});
describe('test for getEmployeeById', () => {

    test('to get an employee by Id', async () => {
        const mockedFn1 = jest.fn()
        const mockedFn = jest.fn()
        
        employeeRepository.findAnEmployeeById= mockedFn;
        
        mockedFn.mockResolvedValue(employee);
       
        const getEmployees = await employeeService.getEmployeeById(employee.id);
        expect(getEmployees).toStrictEqual(employee);

    })           
    }
    );
    describe('test for delete employee', () => {

        test('to delete by id', async () => {
            const mockedFn1 = jest.fn()
            const mockedFn = jest.fn()
            
            employeeRepository.findAnEmployeeById= mockedFn;
            employeeRepository.deleteEmployee= mockedFn1;
            mockedFn.mockResolvedValue(employee);
            mockedFn1.mockResolvedValue(null);
           
            const getEmployees = await employeeService.deleteEmployee(employee.id);
            expect(getEmployees).toStrictEqual(undefined);
    
        })           
        }
        );


    describe('test for loginEmployee', () => {
        const loginEmployeeDto: LoginEmployeeDto = plainToClass(LoginEmployeeDto, {
            username: "Aromal", 
            password: "1234"
        })
        test(`should throw not fount exception if employee doesn't exist`, async () => {
            const findEmplyeeByUserNameMock = jest.fn();
            employeeRepository.findAnEmployeeByUsername = findEmplyeeByUserNameMock;
            findEmplyeeByUserNameMock.mockResolvedValue(null);
            expect(
                async () => await employeeService.loginEmployee(loginEmployeeDto)
              ).rejects.toThrowError("employee not found");
        })
        test(`should throw error on password missmatch`, async () => {
            const findEmplyeeByUserNameMock = jest.fn();
            employeeRepository.findAnEmployeeByUsername = findEmplyeeByUserNameMock;
            findEmplyeeByUserNameMock.mockResolvedValue(employee);
            bcrypt.compare=jest.fn().mockResolvedValue(false);
                expect(
                async () => await employeeService.loginEmployee(loginEmployeeDto)
              ).rejects.toThrowError("incorrect username or password");
        })
        test(`should login`, async () => {
            const findEmplyeeByUserNameMock = jest.fn();
            employeeRepository.findAnEmployeeByUsername = findEmplyeeByUserNameMock;
            findEmplyeeByUserNameMock.mockResolvedValue(employee);
            bcrypt.compare=jest.fn().mockResolvedValue(true);
            jsonwebtoken.sign=jest.fn().mockResolvedValue("afdassafdasd");
            expect (await employeeService.loginEmployee(loginEmployeeDto)).toStrictEqual("afdassafdasd")
        })
    }
    )

})