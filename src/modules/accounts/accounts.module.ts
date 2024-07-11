import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './accounts.controller';
import { Profile, UserEntity, CodeAccountActivate } from './accounts.entity';
import { UserService } from './accounts.service';
import { EmailService } from '../email/email.service';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, Profile, CodeAccountActivate])],
    controllers: [UserController],
    providers: [UserService, EmailService],
})
export class AccountsModule {}