import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CodeAccountActivateDTO, UserEntityDTO } from './accounts.dto';
import { UserEntity } from './accounts.entity';
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

    @ApiQuery({ type: CodeAccountActivateDTO})
    @Post('verify-email')
    async verifyEmailCode(@Body(new ValidationPipe({ transform: true })) validateAccDTO: CodeAccountActivateDTO): Promise<any> {
        return await this.userService.verifyEmailCode(validateAccDTO);
    }

}