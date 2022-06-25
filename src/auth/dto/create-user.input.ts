import { AccountTypes } from '@common/types/account-types';
import { Field, InputType } from '@nestjs/graphql';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
    @IsNotEmpty()
    @IsString()
    @MaxLength(22)
    @Field()
    nickname: string;

    @IsEmail()
    @Field()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @Field()
    login: string;

    @IsString()
    @MinLength(6)
    @MaxLength(60)
    @Field()
    password: string;

    @IsEnum(AccountTypes)
    @Field()
    accountType: number;
}
