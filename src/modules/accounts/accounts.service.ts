import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntityDTO } from './accounts.dto';
import { UserEntity } from './accounts.entity';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(userDto: UserEntityDTO): Promise<any> {

        // existing email verification
        const existingUser = await this.userRepository.findOne({ where: { email: userDto.email } });
        if (existingUser) {
            throw new ConflictException('email already registered.');
        }

        // insert user
        const newUser = new UserEntity();
        newUser.isActive = userDto.isActive;
        newUser.level = userDto.level;
        newUser.email = userDto.email;
        newUser.isEmailConfirmed = userDto.isEmailConfirmed;
        newUser.password = await this.hashPassword(userDto.password);

        try {
            const savedUser = await this.userRepository.save(newUser);
            return {'message': 'User created successfully', 'statusCode': 201};
        } catch (error) {
            throw new ConflictException('an error occurred.');
        }
    }

    // password hash
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }

}