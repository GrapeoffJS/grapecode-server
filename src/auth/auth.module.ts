import { EmailConfirmationEntity } from '@common/entities/email-confirmation.entity';
import { UserEntity } from '@common/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './services/auth.service';
import { EmailConfirmationService } from './services/email-confirmation.service';
import { JwtFactoryService } from './services/jwt-factory.service';
import { PasswordService } from './services/password.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, EmailConfirmationEntity])],
    providers: [
        AuthResolver,
        AuthService,
        JwtFactoryService,
        PasswordService,
        EmailConfirmationService,
    ],
})
export class AuthModule {}
