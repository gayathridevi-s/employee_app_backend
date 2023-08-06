import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";

import { Type } from "class-transformer";
import { Role } from "../utils/role.enum";
import { Status } from "../utils/status.enum";
import { Index } from "typeorm";
import CreateAddressDto from "./create-address.dto";
import CreateDepartmentDto from "./create-department.dto";


export class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @Index({ unique: true })
    @IsString()
    username: string;

    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=>CreateAddressDto)
    address:CreateAddressDto;
    
    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsDateString()
    joiningDate: string

    @IsNotEmpty()
    @IsNumber()
    experience: number


  
    @IsNotEmpty()
    @Type(()=>CreateDepartmentDto)
    department:CreateDepartmentDto;

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role
}