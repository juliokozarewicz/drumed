// user.dto.ts

import { IsNotEmpty, IsBoolean, IsInt, IsString, IsEmail, Length, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntityDTO {

    @IsBoolean()
    isActive: boolean;

    @IsBoolean()
    level: boolean;

    @ApiProperty({ 
        example: 'robertfolk@gmail.com', 
    })
    @IsEmail({}, { message: 'Please enter a valid email address' })
    email: string;

    @IsNotEmpty()
    @IsBoolean()
    isEmailConfirmed: boolean;

    @ApiProperty({ 
        example: '$2b$10$hi5p9zPdA2z7qGy4QF5OP.xONlFhwBwJr8FMTZPmeWudZdVnBB2cq', 
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    @Matches(/^(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/^(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/^(?=.*\d)/, { message: 'Password must contain at least one number' })
    @Matches(/^(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character (e.g., !@#$%^&*)' })
    password: string;

    constructor(partial: Partial<UserEntityDTO>) {
        Object.assign(this, partial);
        this.isActive = true;
        this.level = false;
        this.isEmailConfirmed = false;
    }
}

export class ProfileDTO {
    @ApiProperty({ 
        example: 'Robert Folk', 
    })
    @IsOptional()
    @IsString()
    @Length(1, 255)
    name: string;

    @ApiProperty({ 
        example: "I'm Robert Folk, a pharmacist with a deep love for music and science. Exploring the intricate rhythms of life while delving into the complexities of medicine fuels my passion for both art and discovery.", 
    })
    @IsOptional()
    @IsString()
    @Length(1, 500)
    biography: string;

    @ApiProperty({ 
        example: '55041997106575', 
    })
    @IsOptional()
    @IsString()
    @Length(1, 25)
    phone: string;

    @ApiProperty({ 
        example: '12345678909', 
    })
    @IsOptional()
    @IsString()
    @Length(1, 25)
    cpf: string;
}