import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../accounts/accounts.entity';

@Entity()
export class DrugEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userIdInsert: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  barcode: string;

  @Column({ length: 1000, nullable: false })
  description: string;

  @Column({ length: 255, nullable: false })
  laboratory: string;

  @Column({ length: 255, nullable: false })
  unitOfMeasurement: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  purchasePrice: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false })
  sellingPrice: number;

  @Column({ type: 'date', nullable: false })
  expirationDate: Date;

  @Column({ length: 255, nullable: false })
  category: string;

  @Column({ length: 255, nullable: false })
  batch: string;

  @Column({ type: 'boolean', nullable: false })
  restricted: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // user relation
  @ManyToOne(() => UserEntity, user => user.drugs, { onDelete: 'CASCADE' })
  user: UserEntity;
}