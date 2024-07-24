import { Controller, Post, Body, ValidationPipe, UseGuards, BadRequestException } from '@nestjs/common';
import { CodeAccountActivateDTO, resendUserDTO, UserEntityDTO, changePasswordLinkDTO, changePasswordDTO, LoginDTO } from './accounts.dto';
import { UserService } from './accounts.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
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
    async createUser(@Body(new ValidationPipe({ transform: true })) createUserDto: UserEntityDTO) {
        return await this.userService.createUser(createUserDto);
    }

    @ApiQuery({ type: resendUserDTO})
    @Post('resend-verify-email')
    async resendVerifyEmailCode(@Body(new ValidationPipe({ transform: true })) resendEmailDto: resendUserDTO) {
        return await this.userService.resendVerifyEmailCode(resendEmailDto);
    }
  
    @ApiQuery({ type: CodeAccountActivateDTO})
    @Post('verify-email')
    async verifyEmailCode (@Body(new ValidationPipe({ transform: true })) activateDTO: CodeAccountActivateDTO) { 
        return await this.userService.verifyEmailCode(activateDTO);
    }

    @ApiQuery({ type: changePasswordLinkDTO})
    @Post('change-password-link')
    async changePasswordLink(@Body(new ValidationPipe({ transform: true })) changePasswordLinkDTO: changePasswordLinkDTO) { 
        return await this.userService.changePasswordLink(changePasswordLinkDTO);
    }

    @ApiQuery({ type: changePasswordDTO})
    @Post('change-password')
    async changePassword(@Body(new ValidationPipe({ transform: true })) changePasswordDTO: changePasswordDTO) { 
        return await this.userService.changePassword(changePasswordDTO);
    }

    @ApiQuery({ type: LoginDTO})
    @Post('login')
    async login(@Body(new ValidationPipe({ transform: true })) loginDto: LoginDTO) {
        return this.userService.login(loginDto);
    }
}