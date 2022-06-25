import { CommonModule } from '@common/common.module';
import { SmtpConnectionLinkBuilder } from '@common/config/smtp-connection-link-builder';
import { AuthGuard } from '@common/guards/auth.guard';
import { GqlThrottlerGuard } from '@common/guards/throttler.guard';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { join } from 'node:path';

import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService): TypeOrmModuleOptions {
                return {
                    type: 'postgres',
                    port: Number.parseInt(configService.get('POSTGRES_PORT')),
                    username: configService.get('POSTGRES_USERNAME'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DATABASE'),
                    synchronize: configService.get('SYNCHRONIZE') === 'YES',
                    autoLoadEntities: true,
                };
            },
        }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService): ApolloDriverConfig {
                return {
                    debug:
                        configService.get('APOLLO_ENABLE_DEBUG_MODE') === 'YES',
                    playground:
                        configService.get('APOLLO_ENABLE_PLAYGROUND') === 'YES',
                    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
                    sortSchema: true,
                    cors: {
                        origin:
                            configService.get<string>('CORS_ALLOWED_ORIGINS') ||
                            '',
                        credentials: true,
                    },
                    context: ({ req, res }) => ({ req, res }),
                };
            },
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService): MailerOptions {
                return {
                    transport: new SmtpConnectionLinkBuilder()
                        .setProtocol(configService.get('SMTP_PROTOCOL'))
                        .setHost(configService.get('SMTP_HOST'))
                        .setPort(configService.get('SMTP_PORT'))
                        .setUsername(configService.get('SMTP_USERNAME'))
                        .setPassword(configService.get('SMTP_PASSWORD'))
                        .build(),
                };
            },
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService): ThrottlerModuleOptions {
                return {
                    limit: Number.parseInt(
                        configService.get('THROTTLER_LIMIT'),
                    ),
                    ttl: Number.parseInt(configService.get('THROTTLER_TTL')),
                };
            },
        }),
        AuthModule,
    ],
    controllers: [],
    providers: [
        { provide: APP_GUARD, useClass: AuthGuard },
        { provide: APP_GUARD, useClass: GqlThrottlerGuard },
        { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    ],
})
export class AppModule {}
