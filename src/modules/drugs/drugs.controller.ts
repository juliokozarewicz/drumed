import { Controller, Get, Post, Body, BadGatewayException, ValidationPipe, Put, Delete, UseGuards } from '@nestjs/common';
import { drugServices } from './drugs.service';
import { createDTO, readDTO, updateDTO, deleteDTO } from './drugs.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('DRUGS')
@Controller('api')
export class drugController {

    constructor (private readonly drugServices: drugServices) {}

    @Post('insert')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiQuery({ type: createDTO})
    createDrug(@Body(new ValidationPipe({ transform: true })) body: createDTO) {
      return this.drugServices.createDrug(body);
    }

    @Get('read')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiQuery({ type: readDTO})
    readDrug() {
        return this.drugServices.readDrug();
    }

    @Put('update')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiQuery({ type: updateDTO})
    updateDrug(@Body(new ValidationPipe({ transform: true })) body: updateDTO) {
        return this.drugServices.updateDrug(body);
    }

    @Delete('delete')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiQuery({ type: deleteDTO})
    deleteDrug(@Body(new ValidationPipe({ transform: true })) body: deleteDTO) {
        return this.drugServices.deleteDrug(body);
    }

}