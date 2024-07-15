import { Controller, Post, Body, ValidationPipe, Get, Param } from '@nestjs/common';
import { CodeAccountActivateDTO, UserEntityDTO } from './accounts.dto';
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

    @Get('verify-email/email=:email/code=:code')
    async verifyEmailCode(@Param() activateDTO: CodeAccountActivateDTO): Promise<any> {
        return await this.userService.verifyEmailCode(activateDTO);
    }

}