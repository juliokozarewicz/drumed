import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, Unique } from 'typeorm';


@Entity()
export class Profile {
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

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    level: boolean;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'boolean', default: false })
    isEmailConfirmed: boolean;

    @Column({ type: 'varchar', length: 255 })
    password: string;
}
