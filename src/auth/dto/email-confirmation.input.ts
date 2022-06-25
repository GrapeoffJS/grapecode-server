import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';

@InputType()
export class EmailConfirmationInput {
    @IsUUID()
    @Field()
    owner_id: string;

    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Field()
    code: number;
}
