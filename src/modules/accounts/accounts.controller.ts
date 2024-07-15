import { Controller, Post, Body, ValidationPipe, Get, Param } from '@nestjs/common';
import { CodeAccountActivateDTO, resendUserDTO, UserEntityDTO } from './accounts.dto';
import { UserService } from './accounts.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags('ACCOUNTS')
@Controller('accounts')
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
    @Post('resend-verify-email/email=:email')
    async resendVerifyEmailCode(@Body(new ValidationPipe({ transform: true })) resendEmailDto: resendUserDTO): Promise<any> {
        return await this.userService.resendVerifyEmailCode(resendEmailDto);
    }

    @Get('verify-email/email=:email/code=:code')
    async verifyEmailCode(@Param() activateDTO: CodeAccountActivateDTO): Promise<any> {
        return await this.userService.verifyEmailCode(activateDTO);
    }

}