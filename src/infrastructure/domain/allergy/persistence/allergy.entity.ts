import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { AllergyType } from '../../../../application/domain/allergy/allergy.type';

@Entity('tbl_allergy')
export class AllergyTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'allergy_id' })
    id: string;

    @Column('int', { nullable: false })
    type: AllergyType;

    @ManyToOne(() => UserTypeormEntity, (user) => user.allergies)
    user: UserTypeormEntity;

    constructor(user: UserTypeormEntity, type: AllergyType, id?: string) {
        this.id = id;
        this.user = user;
        this.type = type;
    }
}
