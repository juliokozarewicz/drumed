import { Controller, Get, Post, Body, ValidationPipe, Put, Delete, UseGuards, Param, Req } from '@nestjs/common';
import { drugServices } from './drugs.service';
import { createDTO, updateDTO, deleteDTO } from './drugs.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('DRUGS')
@Controller('api')
export class drugController {

    constructor (private readonly drugServices: drugServices) {}

    @Post('insert')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiBody({ type: createDTO})
    @ApiOperation({
        summary: 'Create Medication',
        description: 'Allows the user to create a new medication by providing the necessary details.'
    })
    createDrug(
        @Req() req: any,
        @Body(new ValidationPipe({ transform: true })) createDTO: createDTO
    ) {
        const userData = req.user;
      return this.drugServices.createDrug(userData, createDTO);
    }

    @Get('read')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get Medications',
        description: 'Retrieves a list of medications available in the system.'
    })
    readDrug(@Req() req: any) {
        const userData = req.user;
        return this.drugServices.readDrug(userData);
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