import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class DrugDTO {
    
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
        example: 'Paracetamol, also known as acetaminophen, is a widely used over-the-counter medication renowned for its efficacy in relieving pain and reducing fever. This analgesic and antipyretic agent is commonly employed to alleviate various mild to moderate ailments, including headaches, muscle aches, menstrual cramps, and minor arthritis pain. Its mechanism of action involves inhibition of prostaglandin synthesis in the central nervous system, resulting in diminished pain perception and fever response. Paracetamol is generally considered safe when used at recommended doses but should be used cautiously in certain populations, such as those with liver impairment or a history of alcohol abuse. Despite its widespread availability and relatively low incidence of adverse effects, exceeding the recommended dosage can lead to severe liver damage or even fatal overdose. Therefore, it is imperative to adhere to dosing guidelines and avoid simultaneous consumption with other medications containing paracetamol to prevent unintentional overdose. Overall, paracetamol remains a staple in households and healthcare settings worldwide due to its potent analgesic and antipyretic properties, offering reliable relief for various common ailments.', 
        maxLength: 255
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
  