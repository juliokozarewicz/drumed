import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class drugEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false })
  barcode: string;

  @Column({ length: 500, nullable: false })
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

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;
}