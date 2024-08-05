import { Controller, Get, Post, Body, ValidationPipe, Put, Delete, UseGuards, Param, Req } from '@nestjs/common';
import { drugServices } from './drugs.service';
import { createDTO, updateDTO, deleteDTO } from './drugs.dto';
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
    createDrug(
        @Req() req: any,
        @Body(new ValidationPipe({ transform: true })) body: createDTO
    ) {
        const userData = req.user;
      return this.drugServices.createDrug(userData, body);
    }

    @Get('read')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
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