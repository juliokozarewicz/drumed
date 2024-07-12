import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeAccountActivateDTO, UserEntityDTO } from './accounts.dto';
import { Profile, UserEntity, CodeAccountActivate } from './accounts.entity';
import * as bcrypt from 'bcryptjs';
import { sanitizeNameString, sanitizeEmail } from './accounts.sanitize';
import { EmailService } from '../email/email.service';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(CodeAccountActivate)
        private readonly userAccCodeActivate: Repository<CodeAccountActivate>,
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
        const codeAccount = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

        try {

            await this.userRepository.manager.transaction(async transactionalEntityManager => {

                // commit user
                const savedUser = await transactionalEntityManager.save(newUser);

                // commit new profile
                const newProfile = new Profile();
                newProfile.id = savedUser.id;
                await transactionalEntityManager.save(newProfile);

                // commit code activate
                const codeAccActivate = new CodeAccountActivate();
                codeAccActivate.id = savedUser.id;
                codeAccActivate.code = codeAccount;
                codeAccActivate.email = savedUser.email;
                await transactionalEntityManager.save(codeAccActivate);
            });

            // send email code for acc activate
            // -----------------------------------------------------------
            const to = newUser.email;
            const subject = `${process.env.API_NAME} - Account activation`;
            const text = `Your account activation code is:\n${codeAccount}`;

            await this.emailService.sendTextEmail(to, subject, text);
            // -----------------------------------------------------------

            return {'message': 'User created successfully', 'statusCode': 201};
        } catch (error) {
            throw new BadRequestException(`an error occurred`);
        }
    }

    // insert new user
    async activateAccount(accActivateDTO: CodeAccountActivateDTO): Promise<any> {
        try {
            const CodeAccActivate = await this.userAccCodeActivate.findOne({ where: { email: accActivateDTO.email, code: accActivateDTO.code}});

            if (CodeAccActivate) {

                // delete all codes
                const deleteAllCodes = await this.userAccCodeActivate.find( { where: { email: accActivateDTO.email } } );

                for (let i = 0; i < deleteAllCodes.length; i++) {
                    await this.userAccCodeActivate.remove(deleteAllCodes[i]);
                }

                // Active account
                const activeAccEnd = await this.userRepository.findOne( { where: { email: accActivateDTO.email} } );
                activeAccEnd.isEmailConfirmed = true;
                await this.userRepository.save(activeAccEnd);

                return {"message": `account activated successfully`};
            } else {
                throw new BadRequestException();
            }

        } catch (error) {
            throw new BadRequestException(`error with activation code`);
        }
    }

    // password hash
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }

}