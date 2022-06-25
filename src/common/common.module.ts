import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import Joi from 'joi';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            envFilePath: '.env',
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USERNAME: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DATABASE: Joi.string().required(),
                SYNCHRONIZE: Joi.string().valid('YES', 'NO'),
                APOLLO_ENABLE_DEBUG_MODE: Joi.string().valid('YES', 'NO'),
                APOLLO_ENABLE_PLAYGROUND: Joi.string().valid('YES', 'NO'),
                CORS_ALLOWED_ORIGINS: Joi.string(),
                JWT_ISSUER: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_REFRESH_SECRET: Joi.string().required(),
                JWT_LIFETIME: Joi.string().required(),
                JWT_REFRESH_LIFETIME: Joi.string().required(),
                SMTP_PROTOCOL: Joi.string().required(),
                SMTP_HOST: Joi.string().required(),
                SMTP_PORT: Joi.number().required(),
                SMTP_USERNAME: Joi.string().required(),
                SMTP_PASSWORD: Joi.string().required(),
                THROTTLER_TTL: Joi.number().required(),
                THROTTLER_LIMIT: Joi.number().required(),
            }),
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService): JwtModuleOptions {
                return {
                    signOptions: {
                        algorithm: 'HS256',
                        issuer: configService.get('JWT_ISSUER'),
                    },
                };
            },
        }),
        Reflector,
    ],
    providers: [ConfigService, JwtService, Reflector],
    exports: [ConfigService, JwtService, Reflector],
})
export class CommonModule {}
