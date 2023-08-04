import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import Employee from "../../entity/employee.entity";
import EmployeeService from "../../service/employee.service";
import { when } from "jest-when";
import { NotFoundException } from "../../Exception/not-found.exception";

describe('employee service tests', () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee));
        employeeService = new EmployeeService(employeeRepository);
    });
    describe('test for getEmployeeById', () => {
        test('test employee for id 1', async () => {
            // when(mockFunction).calledWith{id:1}).
             employeeRepository.findAnEmployeeById = jest.fn();
            when(employeeRepository.findAnEmployeeById).calledWith(1).mockResolvedValue(null);
            // const employee = await employeeService.getEmployeeById(1);
            expect(async() => {await employeeService.getEmployeeById(1)}).rejects.toThrowError();

        });
        test('should return value when user with proper id',async()=>{
            employeeRepository.findAnEmployeeById = jest.fn();
            when(employeeRepository.findAnEmployeeById).calledWith(11).mockResolvedValue({"id":123,"name":"employee name"} as Employee);
            const result=await employeeService.getEmployeeById(11)
            expect(result).toStrictEqual({"id":123,"name":"employee name"});
            })
    })
})