import { UserEntity } from '@common/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserInput } from '../dto/create-user.input';
import { EmailConfirmationService } from './email-confirmation.service';
import { JwtFactoryService } from './jwt-factory.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly emailConfirmationService: EmailConfirmationService,
        private readonly jwtFactoryService: JwtFactoryService,
        private readonly passwordService: PasswordService,
    ) {}

    async register(createUserInput: CreateUserInput) {
        try {
            const user = await this.userRepository.save({
                ...createUserInput,
                password: await this.passwordService.hash(
                    createUserInput.password,
                ),
            });
            await this.emailConfirmationService.sendConfirmationEmail(user);

            return user;
        } catch {
            throw new BadRequestException();
        }
    }
}
