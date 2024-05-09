import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class createDTO {

    @ApiProperty({ 
        example: 'paracetamol', 
        maxLength: 255
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ 
        example: '78962516585465', 
        maxLength: 255
    })
    @IsNotEmpty()
    barcode: string;

    @ApiProperty({ 
        example: "Paracetamol, or acetaminophen, is a widely used medication for pain and fever. It's safe in recommended doses but risky for liver issues and alcohol history. Misuse can cause severe damage. It's crucial to follow dosing guidelines and avoid combining with other paracetamol medications to prevent overdose.", 
        maxLength: 500
    })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ 
        example: 'labotanx', 
        maxLength: 255
    })
    @IsNotEmpty()
    laboratory: string;

    @ApiProperty({ 
        example: 'unit', 
        maxLength: 255
    })
    @IsNotEmpty()
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
    @IsNotEmpty()
    expirationDate: Date;

    @ApiProperty({ 
        example: 'analgesic', 
        maxLength: 255
    })
    @IsNotEmpty()
    category: string;

    @ApiProperty({ 
        example: 'dsf54sdf650', 
        maxLength: 255
    })
    @IsNotEmpty()
    batch: string;

    @ApiProperty({ 
        example: 'false',
        maxLength: 255
    })
    @IsNotEmpty()
    restricted: boolean;
  }

  export class readDTO {}

  export class updateDTO {
    
    @ApiProperty({ 
        example: 'b5a6c7fd-8d0e-45a7-9b17-fd5fd7f5c822', 
    })
    @IsNotEmpty()
    id: string;

    @ApiProperty({ 
        example: 'paracetamol', 
        maxLength: 255
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ 
        example: '78962516585465', 
        maxLength: 255
    })
    @IsNotEmpty()
    barcode: string;

    @ApiProperty({ 
        example: "Paracetamol, or acetaminophen, is a widely used medication for pain and fever. It's safe in recommended doses but risky for liver issues and alcohol history. Misuse can cause severe damage. It's crucial to follow dosing guidelines and avoid combining with other paracetamol medications to prevent overdose.", 
        maxLength: 500
    })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ 
        example: 'labotanx', 
        maxLength: 255
    })
    @IsNotEmpty()
    laboratory: string;

    @ApiProperty({ 
        example: 'unit', 
        maxLength: 255
    })
    @IsNotEmpty()
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
    @IsNotEmpty()
    expirationDate: Date;

    @ApiProperty({ 
        example: 'analgesic', 
        maxLength: 255
    })
    @IsNotEmpty()
    category: string;

    @ApiProperty({ 
        example: 'dsf54sdf650', 
        maxLength: 255
    })
    @IsNotEmpty()
    batch: string;

    @ApiProperty({ 
        example: 'false',
        maxLength: 255
    })
    @IsNotEmpty()
    restricted: boolean;
  }

  export class deleteDTO {
    
    @ApiProperty({ 
        example: 'b5a6c7fd-8d0e-45a7-9b17-fd5fd7f5c822', 
    })
    @IsNotEmpty()
    id: string;
  }