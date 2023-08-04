import { IsEmail, IsEnum, IsNotEmpty, IsString, ValidateNested, isNotEmpty } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import { Role } from "../utils/role.enum";

export class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(()=>CreateAddressDto)
    address:CreateAddressDto;

  
    @IsNotEmpty()
    @IsEnum(Role)
    role:Role
    
}