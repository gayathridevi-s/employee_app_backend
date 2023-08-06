import { IsNotEmpty, IsString} from "class-validator"

export class LoginEmployeeDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}