import { EmailConfirmationEntity } from '@common/entities/email-confirmation.entity';
import { UserEntity } from '@common/entities/user.entity';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';

import { EmailConfirmationInput } from '../dto/email-confirmation.input';

@Injectable()
export class EmailConfirmationService {
    constructor(
        @InjectRepository(EmailConfirmationEntity)
        private readonly emailConfirmationRepository: Repository<EmailConfirmationEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly mailerService: MailerService,
    ) {}

    async sendConfirmationEmail(user: UserEntity) {
        try {
            const emailConfirmation =
                await this.emailConfirmationRepository.save({
                    owner_id: user.id,
                    code: Math.floor(100_000 + Math.random() * 900_000),
                });

            await this.mailerService.sendMail({
                from: 'noreply@grapecode.com',
                to: user.email,
                subject: 'Подтвердите свою регистрацию на GrapeCode',
                html: `
                    <h1>Приветствуем вас, ${user.nickname}!</h1>
                    <p>
                        Вы только что успешно зарегистрировались на нашем сайте, но остался последний шаг: вам нужно подтвердить свою почту. 
                        Если вы не регистрировались на нашем сайте, просто проигнорируйте это сообщение. Система автоматически удалит этот аккаунт через некоторое время.
                    </p>
                    <p>Ваш код подтверждения: <strong>${emailConfirmation.code}</strong></p>
                `,
            });
        } catch {
            throw new InternalServerErrorException();
        }
    }

    async confirm(emailConfirmationInput: EmailConfirmationInput) {
        try {
            await this.emailConfirmationRepository.findOneByOrFail(
                emailConfirmationInput,
            );

            await this.userRepository.update(
                {
                    id: emailConfirmationInput.owner_id,
                },
                { isConfirmed: true },
            );

            await this.emailConfirmationRepository.delete({
                owner_id: emailConfirmationInput.owner_id,
            });

            return this.userRepository.findOneBy({
                id: emailConfirmationInput.owner_id,
            });
        } catch {
            throw new BadRequestException();
        }
    }
}
