import { ValidateIf } from "class-validator";
import Address from "../entity/address.entity";

export UpdateEmployeeDto{
    @ValidateIf((value)=>)
    name:string;
    email:string;
    address:Address;
}