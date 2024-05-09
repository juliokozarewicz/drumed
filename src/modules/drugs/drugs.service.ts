import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { drugEntity } from './drugs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class drugServices {

  // ---------------------------------------------------------------------------------
  constructor(
    @InjectRepository(drugEntity)
      private readonly drugEntity: Repository<drugEntity>,
  ) {}
  // ---------------------------------------------------------------------------------

  async createDrug(body: any) {
    //const id = body['id'];
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

    // insert in DB
    const drugData = this.drugEntity.create({
      //id,
      name,
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
  
    return await this.drugEntity.save(drugData);
  }

  async readDrug() {
    // get from DB
    return await this.drugEntity.find();
  }

  async updateDrug(body: any) {
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

    // update in DB
    const drugUpdate = await this.drugEntity.findOne({ where: { id } });

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

    return await this.drugEntity.save(drugUpdate);
  }

  async deleteDrug(body: any) {

    const id = body['id']

    if (!id) {
        throw new BadRequestException("id is required")
    }

    // update in DB
    const drugDelete = await this.drugEntity.findOne({ where: { id } });

    if (!drugDelete) {
      throw new NotFoundException(`not found`);
    }

    return await this.drugEntity.delete(id);

}
}