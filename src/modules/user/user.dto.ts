// user.dto.ts

import { IsUUID, IsNotEmpty, IsBoolean, IsInt, IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class updateUserDTO {
    @ApiProperty({ 
        example: 'b5a6c7fd-8d0e-45a7-9b17-fd5fd7f5c822', 
    })
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @ApiProperty({ 
        example: 'false', 
    })
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        description: 'User level. Can be 0 for administrator, 1 for moderator, or 3 for query.',
        example: '3',
    })
    @IsNotEmpty()
    @IsInt()
    level: number;

    @ApiProperty({ 
        example: 'Robert Folk', 
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    name: string;

    @ApiProperty({ 
        example: 'robertfolk@gmail.com', 
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ 
        example: '0', 
    })
    @IsNotEmpty()
    @IsBoolean()
    isEmailConfirmed: boolean;

    @ApiProperty({ 
        example: '$2b$10$hi5p9zPdA2z7qGy4QF5OP.xONlFhwBwJr8FMTZPmeWudZdVnBB2cq', 
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 255)
    password: string;

    @ApiProperty({ 
        example: "I'm Robert Folk, a pharmacist with a deep love for music and science. Exploring the intricate rhythms of life while delving into the complexities of medicine fuels my passion for both art and discovery.", 
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 500)
    biography: string;

    @ApiProperty({ 
        example: '55041997106575', 
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 25)
    phone: string;

    @ApiProperty({ 
        example: '12345678909', 
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 25)
    cpf: string;
}
