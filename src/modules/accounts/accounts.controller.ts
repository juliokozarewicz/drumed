import { Controller, Post, Body, ValidationPipe, Get, Param, Res, UseGuards } from '@nestjs/common';
import { CodeAccountActivateDTO, resendUserDTO, UserEntityDTO } from './accounts.dto';
import { UserService } from './accounts.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('ACCOUNTS')
@Controller('accounts')
@UseGuards(ThrottlerGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @ApiQuery({ type: UserEntityDTO})
    @Post('signup')
    async createUser(@Body(new ValidationPipe({ transform: true })) createUserDto: UserEntityDTO): Promise<any> {
        return await this.userService.createUser(createUserDto);
    }

    @ApiQuery({ type: resendUserDTO})
    @Post('resend-verify-email')
    async resendVerifyEmailCode(@Body(new ValidationPipe({ transform: true })) resendEmailDto: resendUserDTO): Promise<any> {
        return await this.userService.resendVerifyEmailCode(resendEmailDto);
    }

    @ApiQuery({ type: CodeAccountActivateDTO})
    @Post('verify-email')
    async verifyEmailCode (@Body(new ValidationPipe({ transform: true })) activateDTO: CodeAccountActivateDTO): Promise<any> { 
        return await this.userService.verifyEmailCode(activateDTO);
    }

}