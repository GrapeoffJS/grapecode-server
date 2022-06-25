import { BasicEntity } from '@common/entities/basic.entity';
import { Column, Entity } from 'typeorm';

@Entity('email_confirmations')
export class EmailConfirmationEntity extends BasicEntity {
    @Column({ unique: true })
    owner_id: string;

    @Column()
    code: number;
}
