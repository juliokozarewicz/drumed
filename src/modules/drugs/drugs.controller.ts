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
    @ApiBody({ type: updateDTO})
    @ApiOperation({
        summary: 'Update Medication',
        description: 'Allows the user to update an existing medication by providing the necessary details.'
    })
    updateDrug(
        @Req() req: any,
        @Body(new ValidationPipe({ transform: true })) updateDTO: updateDTO
    ) {

        const userData = req.user;
        return this.drugServices.updateDrug(userData, updateDTO);

    }

    @Delete('delete')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiBody({ type: deleteDTO})
    @ApiOperation({
        summary: 'Delete Medication',
        description: 'Allows the user to delete an existing medication by providing the medication ID.'
      })
    deleteDrug(
        @Req() req: any,
        @Body(new ValidationPipe({ transform: true })) deleteDTO: deleteDTO
    ) {

        const userData = req.user;
        return this.drugServices.deleteDrug(userData, deleteDTO);

    }

}