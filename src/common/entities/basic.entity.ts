import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class BasicEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => GraphQLISODateTime)
    @CreateDateColumn()
    created_at: Date;

    @Field(() => GraphQLISODateTime)
    @UpdateDateColumn()
    updated_at: Date;
}
