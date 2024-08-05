import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany, ManyToOne } from 'typeorm';
import { DrugEntity } from '../drugs/drugs.entity';


@Entity()
export class ProfileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    biography: string;

    @Column({ type: 'varchar', length: 25, nullable: true })
    phone: string;

    @Column({ type: 'varchar', length: 25, nullable: true })
    cpf: string;
}

@Entity()
@Unique(['email'])
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'boolean', default: true, nullable: false })
    isActive: boolean;

    @Column({ type: 'boolean', default: false, nullable: false })
    level: boolean;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;

    @Column({ type: 'boolean', default: false, nullable: false })
    isEmailConfirmed: boolean;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    // user data relation
    @OneToMany(() => DrugEntity, drug => drug.user)
    drugs: DrugEntity[];
}

@Entity()
export class CodeAccountActivate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 515 })
    code: string;
}
