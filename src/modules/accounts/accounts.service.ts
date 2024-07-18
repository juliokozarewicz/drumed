import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeAccountActivateDTO, resendUserDTO, UserEntityDTO } from './accounts.dto';
import { Profile, UserEntity, CodeAccountActivate } from './accounts.entity';
import * as bcrypt from 'bcryptjs';
import { sanitizeNameString, sanitizeEmail } from './accounts.sanitize';
import * as crypto from 'crypto';
import { EmailService } from './accounts.email';
import { logsGenerator } from './accounts.logs';


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
            throw new ConflictException({
                statusCode: 409,
                message: `email already registered`,
                _links: {
                    self: { href: "/accounts/signup" },
                    next: { href: "/accounts/login" },
                    prev: { href: "/" }
                }
            });
        }

        try {
            
            // insert data user
            const newUser = new UserEntity();
            newUser.isActive = userDto.isActive;
            newUser.level = userDto.level;
            newUser.name = sanitizeNameString(userDto.name);
            newUser.email = sanitizeEmail(userDto.email);
            newUser.isEmailConfirmed = userDto.isEmailConfirmed;
            newUser.password = await this.hashPassword(userDto.password);

            await this.userRepository.manager.transaction(async transactionalEntityManager => {

                // commit user
                const savedUser = await transactionalEntityManager.save(newUser);

                // commit new profile
                const newProfile = new Profile();
                newProfile.id = savedUser.id;
                await transactionalEntityManager.save(newProfile);

                // Send email
                const codeAccount = await this.sendCodeVerifyEmail(userDto.urlRedirect ,newUser.email)

                // commit code activate
                const codeAccActivate = new CodeAccountActivate();
                codeAccActivate.id = savedUser.id;
                codeAccActivate.code = codeAccount;
                codeAccActivate.email = savedUser.email;
                await transactionalEntityManager.save(codeAccActivate);
            });

            return {
                statusCode: 201,
                message: "user created successfully",
                _links: {
                    self: { href: "/accounts/signup" },
                    next: { href: `/accounts/login`},
                    prev: { href: "/accounts/login" }
                }
            };
        } catch (error) {
            logsGenerator('error', `create user service [createUser()]: ${error}`)
            throw new BadRequestException({
                statusCode: 400,
                message: `an error occurred: ${error}`,
                _links: {
                    self: { href: "/accounts/signup" },
                    next: { href: "/accounts/signup" },
                    prev: { href: "/accounts/signup" }
                }
            });
        }
    }
    
    // Resend verify email
    async resendVerifyEmailCode(resendActivateDTO: resendUserDTO): Promise<any> {

        try {
            // existing email verification
            const existingUser = await this.userRepository.findOne({ where: { email: resendActivateDTO.email } });

            if (!existingUser) {
                throw new BadRequestException({
                    statusCode: 409,
                    message: `email not registered`,
                    _links: {
                        self: { href: "/accounts/resend-verify-email" },
                        next: { href: "/accounts/signup" },
                        prev: { href: "/accounts/login" }
                    }
                });
            }

            // activated email
            if (existingUser.isEmailConfirmed) {
                throw new BadRequestException({
                    statusCode: 409,
                    message: `account with email activated`,
                    _links: {
                        self: { href: "/accounts/resend-verify-email" },
                        next: { href: "/accounts/login" },
                        prev: { href: "/" }
                    }
                });
            }

            // delete existing codes
            const deleteAllCodes = await this.userAccCodeActivate.find( { where: { email: resendActivateDTO.email } } );

            for (let i = 0; i < deleteAllCodes.length; i++) {
                await this.userAccCodeActivate.remove(deleteAllCodes[i]);
            }

            await this.userRepository.manager.transaction(async transactionalResendCodeManager => {
                const codeAccount = await this.sendCodeVerifyEmail(resendActivateDTO.urlRedirect, resendActivateDTO.email)

                const codeAccActivate = new CodeAccountActivate();
                codeAccActivate.code = codeAccount;
                codeAccActivate.email = resendActivateDTO.email;
                await transactionalResendCodeManager.save(codeAccActivate);
            })

            return {
                statusCode: 201,
                message: "code resent successfully",
                _links: {
                    self: { href: "/accounts/resend-verify-email" },
                    next: { href: `/accounts/login`},
                    prev: { href: "/" }
                }
            };

        } catch (error) {
            logsGenerator('error', `error when resending the email link [resendVerifyEmailCode()]: ${error}`)
            throw new BadRequestException({
                statusCode: 400,
                message: `error when resending the email link: (${error})`,
                _links: {
                    self: { href: "/accounts/resend-verify-email" },
                    next: { href: "/accounts/resend-verify-email" },
                    prev: { href: "/" }
                }
            });
        }
    }

    // Verify email
    async verifyEmailCode(accActivateDTO: CodeAccountActivateDTO): Promise<any> {
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

                return {
                    statusCode: 201,
                    message: "account activated successfully",
                    _links: {
                        self: { href: `/accounts/verify-email` },
                        next: { href: "/accounts/login" },
                        prev: { href: "/accounts/signup" }
                    }
                };
            } else {
                logsGenerator('error', `verify email code not valid [verifyEmailCode()]`)
                throw new BadRequestException({
                    statusCode: 400,
                    message: `verify email code not valid [verifyEmailCode()]`,
                    _links: {
                        self: { href: "/accounts/verify-email" },
                        next: { href: "/accounts/resend-verify-email" },
                        prev: { href: "/" }
                    }
                });
            }

        } catch (error) {
            throw new BadRequestException({
                statusCode: 400,
                message: `error with activation code`,
                _links: {
                    self: { href: "/accounts/verify-email" },
                    next: { href: "/accounts/resend-verify-email" },
                    prev: { href: "/" }
                }
            });
        }
    }

    // Password hash
    private async hashPassword(password: string): Promise<string> {
        try {
            const saltRounds = 12;
            return bcrypt.hash(password, saltRounds);
        } catch (error) {
            logsGenerator('error', `bcrypt error [hashPassword()]: ${error}`)
        }
    }

    // Send code verify-email
    private async sendCodeVerifyEmail(link: string, email: string): Promise<string> {

        try {
            const hashString = `${Date.now()*100}${email}${process.env.API_SECURITY_CODE}`;
            const codeAccount = crypto.createHash('sha256').update(hashString).digest('hex');

            const activationLink = (
                `${link}?` +
                `email=${email}&` +
                `code=${encodeURIComponent(codeAccount)}`
            )
            const to = email;
            const subject = `${process.env.API_NAME} - Account activation`;
            const text = (
                `Click the link in this email to activate your ` + 
                `account:\n\n\n${activationLink}`
            );

            await this.emailService.sendTextEmail(to, subject, text);

            return codeAccount
        } catch (error) {
            logsGenerator('error', `code delivery service via email [sendCodeVerifyEmail()]: ${error}`)
            throw new BadRequestException({
                statusCode: 400,
                message: `code delivery service via email`,
                _links: {
                    self: { href: "/accounts/verify-email" },
                    next: { href: "/accounts/resend-verify-email" },
                    prev: { href: "/" }
                }
            });
        }
    }
}