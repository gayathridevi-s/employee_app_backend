import { IsDateString, IsNumber, IsObject, IsString, ValidateIf, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { UpdateAddressDto } from "./update-address.dto";
import { Type } from "class-transformer/types/decorators/type.decorator";

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
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    address: Address;

 }