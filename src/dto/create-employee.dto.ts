import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";

export class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

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


    @ValidateIf((obj) => obj.value !== undefined)
    @IsString()
    departmentId: string;

    @ValidateIf((obj) => obj.value !== undefined)
    @IsString()
    roleId: string
}