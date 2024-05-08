import { Controller, Get, Post, Body, BadGatewayException } from '@nestjs/common';

import { drugServices } from './drugs.service';

@Controller('api')
export class drugController {

    constructor (private readonly drugServices: drugServices) {}

    @Get()
    getWelcome(): string {
        return this.drugServices.getWelcome();
    }

}