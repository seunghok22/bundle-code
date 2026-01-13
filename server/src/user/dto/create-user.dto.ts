import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    googleId?: string;

    @IsString()
    nickname: string;
}
