import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './accounts.controller';
import { UserEntity } from './accounts.entity';
import { UserService } from './accounts.service';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
})
export class AccountsModule {}
