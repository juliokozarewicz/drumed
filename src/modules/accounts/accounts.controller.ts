import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserEntityDTO } from './accounts.dto';
import { UserEntity } from './accounts.entity';
import { UserService } from './accounts.service';
import { ApiQuery } from '@nestjs/swagger';


@Controller('accounts')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiQuery({ type: UserEntityDTO})
    @Post('signup')
    async createUser(@Body(new ValidationPipe({ transform: true })) createUserDto: UserEntityDTO): Promise<UserEntity> {
        return await this.userService.createUser(createUserDto);
    }
}
