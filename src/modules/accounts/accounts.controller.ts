import { Controller, Post, Body, ValidationPipe, UseGuards, BadRequestException } from '@nestjs/common';
import { CodeAccountActivateDTO, resendUserDTO, UserEntityDTO, changePasswordLinkDTO, changePasswordDTO, LoginDTO } from './accounts.dto';
import { UserService } from './accounts.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('ACCOUNTS')
@Controller('accounts')
@UseGuards(ThrottlerGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('signup')
    @ApiBody({ type: UserEntityDTO })
    @ApiOperation({
        summary: 'Create a new user',
        description: 'Registers a new user in the system with the provided details.'
    })
    @ApiResponse({ status: 201, description: 'User successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async createUser(@Body(new ValidationPipe({ transform: true })) createUserDto: UserEntityDTO): Promise<any> {
        return await this.userService.createUser(createUserDto);
    }

    @Post('resend-verify-email')
    @ApiBody({ type: resendUserDTO})
    @ApiOperation({
        summary: 'Resend Verification Email',
        description: 'Resends a verification email to the user based on the provided email address.'
      })
    async resendVerifyEmailCode(@Body(new ValidationPipe({ transform: true })) resendEmailDto: resendUserDTO) {
        return await this.userService.resendVerifyEmailCode(resendEmailDto);
    }

    @Post('verify-email')
    @ApiBody({ type: CodeAccountActivateDTO})
    @ApiOperation({
        summary: 'Verify Email',
        description: 'Verifies the user’s email address based on the provided code.'
    })
    async verifyEmailCode (@Body(new ValidationPipe({ transform: true })) activateDTO: CodeAccountActivateDTO) { 
        return await this.userService.verifyEmailCode(activateDTO);
    }

    @Post('change-password-link')
    @ApiBody({ type: changePasswordLinkDTO})
    @ApiOperation({
        summary: 'Request Password Change Link',
        description: 'Generates a password change link and sends it to the user’s email address.'
    })
    async changePasswordLink(@Body(new ValidationPipe({ transform: true })) changePasswordLinkDTO: changePasswordLinkDTO) { 
        return await this.userService.changePasswordLink(changePasswordLinkDTO);
    }

    @Post('change-password')
    @ApiBody({ type: changePasswordDTO})
    @ApiOperation({
        summary: 'Change User Password',
        description: 'Allows the user to change their password by providing the code.'
    })
    async changePassword(@Body(new ValidationPipe({ transform: true })) changePasswordDTO: changePasswordDTO) { 
        return await this.userService.changePassword(changePasswordDTO);
    }

    @Post('login')
    @ApiBody({ type: LoginDTO})
    @ApiOperation({
        summary: 'User Login',
        description: 'Allows the user to log in by providing their username and password.'
      })
    async login(@Body(new ValidationPipe({ transform: true })) loginDto: LoginDTO) {
        return this.userService.login(loginDto);
    }
}