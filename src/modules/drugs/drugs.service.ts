import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugEntity } from './drugs.entity';
import { Repository } from 'typeorm';
import { createDTO, updateDTO, deleteDTO } from './drugs.dto';
import { sanitizeEmail, sanitizeUserId, sanitizeString } from './drugs.sanitize';


@Injectable()
export class drugServices {

  // ---------------------------------------------------------------------------------
  constructor(
    @InjectRepository(DrugEntity)
      private readonly DrugEntity: Repository<DrugEntity>,
  ) {}
  // ---------------------------------------------------------------------------------

  async createDrug(userData, body: createDTO) {
    //const id = body['id'];
    const name = body['name'];
    const email = sanitizeEmail(userData.username);
    const barcode = body['barcode'];
    const description = body['description'];
    const laboratory = body['laboratory'];
    const unitOfMeasurement = body['unitOfMeasurement'];
    const purchasePrice = body['purchasePrice'];
    const sellingPrice = body['sellingPrice'];
    const expirationDate = body['expirationDate'];
    const category = body['category'];
    const batch = body['batch'];
    const restricted = body['restricted'];

    // insert in DB
    const drugData = this.DrugEntity.create({
      //id,
      name,
      email,
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
  
    return await this.DrugEntity.save(drugData);
  }

  async readDrug(userData) {
    return await this.DrugEntity.find({ where: {email: userData.username} });
  }

  async updateDrug(body: updateDTO) {
    const id = body['id'];
    const name = body['name'];
    const barcode = body['barcode'];
    const description = body['description'];
    const laboratory = body['laboratory'];
    const unitOfMeasurement = body['unitOfMeasurement'];
    const purchasePrice = body['purchasePrice'];
    const sellingPrice = body['sellingPrice'];
    const expirationDate = body['expirationDate'];
    const category = body['category'];
    const batch = body['batch'];
    const restricted = body['restricted'];

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