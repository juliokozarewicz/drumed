import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugEntity } from './drugs.entity';
import { Repository } from 'typeorm';
import { createDTO, updateDTO, deleteDTO } from './drugs.dto';
import { sanitizeEmail, sanitizeUserId } from './drugs.sanitize';
import { logsGenerator } from '../accounts/accounts.logs';


@Injectable()
export class drugServices {

  // ---------------------------------------------------------------------------------
  constructor(
    @InjectRepository(DrugEntity)
      private readonly DrugEntity: Repository<DrugEntity>,
  ) {}

  // exception handling
  private readonly knownExceptions = [
    ConflictException,
    BadRequestException,
    UnauthorizedException
  ];
  // ---------------------------------------------------------------------------------

  async createDrug(userData: any, createDTO: createDTO) {

    try {

      const name = createDTO.name;
      const userID = sanitizeUserId(userData.userId);
      const barcode = createDTO.barcode;
      const description = createDTO.description;
      const laboratory = createDTO.laboratory;
      const unitOfMeasurement = createDTO.unitOfMeasurement;
      const purchasePrice = createDTO.purchasePrice;
      const sellingPrice = createDTO.sellingPrice;
      const expirationDate = createDTO.expirationDate;
      const category = createDTO.category;
      const batch = createDTO.batch;
      const restricted = createDTO.restricted;

      // commit databse
      const drugData = this.DrugEntity.create({
        name,
        userID,
        barcode,
        description,
        laboratory,
        unitOfMeasurement,
        purchasePrice,
        sellingPrice,
        expirationDate,
        category, 
        batch,
        restricted
      });
    
      await this.DrugEntity.save(drugData);

      return {
        "id": drugData.id,
        "name": drugData.name,
        "barcode": drugData.barcode,
        "description": drugData.description,
        "laboratory": drugData.laboratory,
        "unitOfMeasurement": drugData.unitOfMeasurement,
        "purchasePrice": drugData.purchasePrice,
        "sellingPrice": drugData.sellingPrice,
        "expirationDate": drugData.expirationDate,
        "category": drugData.category,
        "batch": drugData.batch,
        "restricted": drugData.restricted,
      }

    } catch (error) {

      if (this.knownExceptions.some(exc => error instanceof exc)) {

        throw error;

      } else {

        // logs
        logsGenerator('error', `create drug service [createDrug()]: ${error}`)

        // return server error
        throw new InternalServerErrorException({
          statusCode: 500,
          message: 'an unexpected error occurred, please try again later',
          _links: {
            self: { href: "/api/create" },
            next: { href: "/api/read" },
            prev: { href: "/api/read" }
          }
        });

      }
    }
  }

  async readDrug(userData: any) {

    try {

      const drugs = await this.DrugEntity.find({ where: { userID: sanitizeUserId(userData.userId) } });

      return drugs.map(drug => ({
        id: drug.id,
        name: drug.name,
        barcode: drug.barcode,
        description: drug.description,
        laboratory: drug.laboratory,
        unitOfMeasurement: drug.unitOfMeasurement,
        purchasePrice: drug.purchasePrice,
        sellingPrice: drug.sellingPrice,
        expirationDate: drug.expirationDate,
        category: drug.category,
        batch: drug.batch,
        restricted: drug.restricted,
      }));

    } catch (error) {
  
      if (this.knownExceptions.some(exc => error instanceof exc)) {

        throw error;

      } else {

        // logs
        logsGenerator('error', `read drug service [readDrug()]: ${error}`)

        // return server error
        throw new InternalServerErrorException({
          statusCode: 500,
          message: 'an unexpected error occurred, please try again later',
          _links: {
              self: { href: "/api/read" },
              next: { href: "/api/read" },
              prev: { href: "/api/read" }
          }
        });

      }
    }
  }

  async updateDrug(userData: any, updateDTO: updateDTO) {
    const id = updateDTO.id;
    const name = updateDTO.name;
    const barcode = updateDTO.barcode;
    const description = updateDTO.description;
    const laboratory = updateDTO.laboratory;
    const unitOfMeasurement = updateDTO.unitOfMeasurement;
    const purchasePrice = updateDTO.purchasePrice;
    const sellingPrice = updateDTO.sellingPrice;
    const expirationDate = updateDTO.expirationDate;
    const category = updateDTO.category;
    const batch = updateDTO.batch;
    const restricted = updateDTO.restricted;

    // search in DB
    const drugUpdate = await this.DrugEntity.findOne({ where: { id } });

    if (!drugUpdate) {
      throw new NotFoundException(`not found`);
    }

    drugUpdate.id = id;
    drugUpdate.name = name;
    drugUpdate.barcode = barcode;
    drugUpdate.description = description;
    drugUpdate.laboratory = laboratory;
    drugUpdate.unitOfMeasurement = unitOfMeasurement;
    drugUpdate.purchasePrice = purchasePrice;
    drugUpdate.sellingPrice = sellingPrice;
    drugUpdate.expirationDate = expirationDate;
    drugUpdate.category = category;
    drugUpdate.batch = batch;
    drugUpdate.restricted = restricted;

    return await this.DrugEntity.save(drugUpdate);
  }

  async deleteDrug(body: deleteDTO) {

    const id = body['id']

    if (!id) {
      throw new BadRequestException("id is required")
    }

    // search in DB
    const drugDelete = await this.DrugEntity.findOne({ where: { id } });

    if (!drugDelete) {
      throw new NotFoundException(`not found`);
    }

    return await this.DrugEntity.delete(id);
 
  }
}