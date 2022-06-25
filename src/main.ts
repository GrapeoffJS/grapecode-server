import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService>(ConfigService);

    // Security
    app.useGlobalPipes(
        new ValidationPipe({
            always: true,
            forbidUnknownValues: true,
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    await app.listen(configService.get('PORT'));

    // Hot Module Reload
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap().then();
