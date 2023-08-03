import { IsEmail, IsNotEmpty, IsString, ValidateNested, isNotEmpty } from "class-validator";
 export class CreateAddressDto{
    @IsNotEmpty()
    @IsString()
    line1:string;

    @IsNotEmpty()
    @IsString()
    pincode:string;
    
}
