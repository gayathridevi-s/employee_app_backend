import { IsString, ValidateIf } from "class-validator";

export class UpdateAddressDto{
    @ValidateIf((obj) => obj.value !== undefined)
    @IsString()
    line1: string;

    @ValidateIf((obj) => obj.value !== undefined)
    @IsString()
    pincode: string;
}