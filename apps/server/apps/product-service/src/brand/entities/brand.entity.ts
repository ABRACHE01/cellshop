import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product  } from '../../product/entities/product.entity';

@Entity('brands')
export class Brand extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: 'the brand name',
    type: 'varchar',
  })
  name: string;

    @Column({
        comment: 'is deleted',
        type: 'boolean',
        default: false,
    })
    isDeleted: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

  @OneToMany(() => Product, product => product.brand)
  products: Product[];
}