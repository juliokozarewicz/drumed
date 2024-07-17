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

    @Get('verify-email/email=:email/code=:code')
    async verifyEmailCode(@Param() activateDTO: CodeAccountActivateDTO, @Res() res: Response): Promise<any> {
        try {
            const message_return = await this.userService.verifyEmailCode(activateDTO);
            return res.redirect(`/accounts/login?message=${encodeURIComponent(message_return.message)}`);
        } catch (error) {
            return res.redirect(`/accounts/resend-verify-email?message=${encodeURIComponent(error)}`);
        }
    }

}