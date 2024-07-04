import { Controller, Get, Post, Body, BadGatewayException, ValidationPipe, Put, Delete } from '@nestjs/common';
import { drugServices } from './drugs.service';
import { createDTO, readDTO, updateDTO, deleteDTO } from './drugs.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('api')
export class drugController {

    constructor (private readonly drugServices: drugServices) {}

    @ApiTags('DRUGS')
    @ApiQuery({ type: createDTO})
    @Post('insert')
    createDrug(@Body(new ValidationPipe({ transform: true })) body: createDTO) {
      return this.drugServices.createDrug(body);
    }

    @ApiTags('DRUGS')
    @Get('read')
    @ApiQuery({ type: readDTO})
    readDrug() {
        return this.drugServices.readDrug();
    }

    @ApiTags('DRUGS')
    @Put('update')
    @ApiQuery({ type: updateDTO})
    updateDrug(@Body(new ValidationPipe({ transform: true })) body: updateDTO) {
        return this.drugServices.updateDrug(body);
    }

    @ApiTags('DRUGS')
    @Delete('delete')
    @ApiQuery({ type: deleteDTO})
    deleteDrug(@Body(new ValidationPipe({ transform: true })) body: deleteDTO) {
        return this.drugServices.deleteDrug(body);
    }

}