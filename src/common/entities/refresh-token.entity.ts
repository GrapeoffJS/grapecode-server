import { BasicEntity } from '@common/entities/basic.entity';
import { Column, Entity } from 'typeorm';

@Entity('refresh_tokens')
export class RefreshTokenEntity extends BasicEntity {
    @Column({ unique: true })
    owner_id: string;
}
