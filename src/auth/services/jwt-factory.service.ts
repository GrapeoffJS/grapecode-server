import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AccessTokenPayload } from '../types/access-token-payload';
import { RefreshTokenPayload } from '../types/refresh-token-payload';

@Injectable()
export class JwtFactoryService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async generateAccessToken(payload: AccessTokenPayload) {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_LIFETIME'),
        });
    }

    async generateRefreshToken(payload: RefreshTokenPayload) {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_LIFETIME'),
        });
    }
}
