import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class PasswordService {
    constructor() {}

    private readonly _saltRounds = 12;

    async hash(password: string) {
        return await hash(password, this._saltRounds);
    }

    async compare(input: string, hash: string) {
        return await compare(input, hash);
    }
}
