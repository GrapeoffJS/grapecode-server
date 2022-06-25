import { AccountTypes } from '@common/types/account-types';
import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { BasicEntity } from './basic.entity';

@ObjectType()
@Entity('users')
export class UserEntity extends BasicEntity {
    @Field()
    @Column({ length: 22 })
    nickname: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field()
    @Column({ unique: true, length: 30 })
    login: string;

    @Exclude()
    @Field()
    @Column()
    password: string;

    @Field()
    @Column({ enum: AccountTypes })
    accountType: number;

    @Field()
    @Column({ length: 60, default: '' })
    status: string;

    @Field()
    @Column({ length: 3000, default: '' })
    about: string;

    @Field()
    @Column({ default: false })
    isConfirmed: boolean;
}
