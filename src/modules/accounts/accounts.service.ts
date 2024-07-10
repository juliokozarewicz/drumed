import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntityDTO } from './accounts.dto';
import { Profile, UserEntity } from './accounts.entity';
import * as bcrypt from 'bcryptjs';
import { sanitizeNameString, sanitizeEmail } from './accounts.sanitize';
import { EmailService } from '../email/email.service';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly emailService: EmailService,
    ) {}

    // insert new user
    async createUser(userDto: UserEntityDTO): Promise<any> {

        // existing email verification
        const existingUser = await this.userRepository.findOne({ where: { email: userDto.email } });
        if (existingUser) {
            throw new ConflictException('email already registered');
        }

        // insert data user
        const newUser = new UserEntity();
        newUser.isActive = userDto.isActive;
        newUser.level = userDto.level;
        newUser.name = sanitizeNameString(userDto.name);
        newUser.email = sanitizeEmail(userDto.email);
        newUser.isEmailConfirmed = userDto.isEmailConfirmed;
        newUser.password = await this.hashPassword(userDto.password);

        try {

            await this.userRepository.manager.transaction(async transactionalEntityManager => {

                // save user
                const savedUser = await transactionalEntityManager.save(newUser);

                // create new profile
                const newProfile = new Profile();
                newProfile.id = savedUser.id;
                await transactionalEntityManager.save(newProfile);

            });

            
            
            
            // send email code for acc activate
            // -----------------------------------------------------------
            const to = 'email@hotmail.com';
            const subject = 'Assuntooooo';
            const text = 'Mensagemmmmmmmm!';

            await this.emailService.sendTextEmail(to, subject, text);
            // -----------------------------------------------------------

            return {'message': 'User created successfully', 'statusCode': 201};
        } catch (error) {
            throw new BadRequestException(`an error occurred: ${error}`);
        }
    }

    // password hash
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }

}