import { IsDateString, IsEnum, IsNumber, IsObject, IsString, ValidateIf, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";

import { Type } from "class-transformer";
import { Status } from "../utils/status.enum";
import { Role } from "../utils/role.enum";
import UpdateAddressDto from "./update-address.dto";

export class UpdateEmployeeDto{
    
    @ValidateIf((obj) => obj.value !== undefined)
    @IsString()
    name: string;


    @ValidateIf((obj) => obj.value !== undefined)
    @IsString()
    password: string;

    @ValidateIf((obj) => obj.value !== undefined)
    @IsDateString()
    joiningDate: string;

    @ValidateIf((obj) => obj.value !== undefined)
    @IsNumber()
    experience: number;

    @ValidateIf((obj) => obj.value !== undefined)
    @IsNumber()
   department : number


    @ValidateIf((obj) => obj.value !== undefined)
    @IsEnum(Role)
    role: Role


    @ValidateIf((obj) => obj.value !== undefined)
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    address: Address;

    @ValidateIf((obj) => obj.value !== undefined)
    @IsEnum(Status)
    status: Status

 }