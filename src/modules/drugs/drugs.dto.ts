import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsBoolean, IsString, Length, IsEmail, IsOptional, IsIn } from 'class-validator';



export class readDTO {

    @Length(1, 255)
    @IsOptional()
    @IsString()
    sortBy: string;

    @Length(1, 255)
    @IsOptional()
    @IsString()
    sortOrder: string;

}

export class createDTO {
 
    @ApiProperty({ 
        example: 'paracetamol', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ 
        example: '78962516585465', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    barcode: string;

    @ApiProperty({ 
        example: "Paracetamol, or acetaminophen, is a widely used medication for pain and fever. It's safe in recommended doses but risky for liver issues and alcohol history. Misuse can cause severe damage. It's crucial to follow dosing guidelines and avoid combining with other paracetamol medications to prevent overdose.", 
        maxLength: 1000
    })
    @Length(1, 1000)
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ 
        example: 'labotanx', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    laboratory: string;

    @ApiProperty({ 
        example: 'unit', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    unitOfMeasurement: string;

    @ApiProperty({ 
        example: '15.55', 
        maxLength: 255
    })
    @IsNotEmpty()
    purchasePrice: number;

    @ApiProperty({ 
        example: '25.78', 
        maxLength: 255
    })
    @IsNotEmpty()
    sellingPrice: number;

    @ApiProperty({ 
        example: '2080-05-18', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    expirationDate: Date;

    @ApiProperty({ 
        example: 'analgesic', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({ 
        example: 'dsf54sdf650', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    batch: string;

    @ApiProperty({ 
        example: 'false',
    })
    @IsNotEmpty()
    @IsBoolean()
    restricted: boolean;
  }

  export class updateDTO {
    
    @ApiProperty({ 
        example: 'b5a6c7fd-8d0e-45a7-9b17-fd5fd7f5c822', 
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string;

    @ApiProperty({ 
        example: 'paracetamol', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ 
        example: '78962516585465', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    barcode: string;

    @ApiProperty({ 
        example: "Paracetamol, or acetaminophen, is a widely used medication for pain and fever. It's safe in recommended doses but risky for liver issues and alcohol history. Misuse can cause severe damage. It's crucial to follow dosing guidelines and avoid combining with other paracetamol medications to prevent overdose.", 
        maxLength: 500
    })
    @Length(1, 500)
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ 
        example: 'labotanx', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    laboratory: string;

    @ApiProperty({ 
        example: 'unit', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    unitOfMeasurement: string;

    @ApiProperty({ 
        example: '15.55', 
        maxLength: 255
    })
    @IsNotEmpty()
    purchasePrice: number;

    @ApiProperty({ 
        example: '25.78', 
        maxLength: 255
    })
    @IsNotEmpty()
    sellingPrice: number;

    @ApiProperty({ 
        example: '2080-05-18', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    expirationDate: Date;

    @ApiProperty({ 
        example: 'analgesic', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({ 
        example: 'dsf54sdf650', 
        maxLength: 255
    })
    @Length(1, 255)
    @IsNotEmpty()
    @IsString()
    batch: string;

    @ApiProperty({ 
        example: 'false',
    })
    @IsNotEmpty()
    @IsBoolean()
    restricted: boolean;
  }

  export class deleteDTO {
    
    @ApiProperty({ 
        example: 'b5a6c7fd-8d0e-45a7-9b17-fd5fd7f5c822', 
    })
    @IsNotEmpty()
    @IsUUID()
    id: string;
  }