import { IsEmail, IsMongoId, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;


    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;
}
