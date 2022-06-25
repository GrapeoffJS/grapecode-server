import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { IsLoginOrEmail } from '../utils/is-login-or-email';

@InputType()
export class AuthInput {
    @IsLoginOrEmail('loginOrEmail', {
        message: 'provided value must be an email or a login',
    })
    @Field()
    loginOrEmail: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    password: string;
}
