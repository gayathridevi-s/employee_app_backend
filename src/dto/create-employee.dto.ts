import { IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";
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
    
}