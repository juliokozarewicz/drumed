import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './accounts.controller';
import { Profile, UserEntity, CodeAccountActivate } from './accounts.entity';
import { UserService } from './accounts.service';
import { EmailService } from './accounts.email';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, Profile, CodeAccountActivate]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'your_secret_key_here',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [UserController],
    providers: [UserService, EmailService],
    exports: [UserService],
})
export class AccountsModule {}