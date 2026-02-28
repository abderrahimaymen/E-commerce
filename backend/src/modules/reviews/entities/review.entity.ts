import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { ReviewStatus } from '../../../domain/enums';

/**
 * 📝 Review Entity — Avis produit avec notation et votes
 */
@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ type: 'int' })
  rating: number; // 1-5

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({
    type: 'enum',
    enum: ReviewStatus,
    default: ReviewStatus.PENDING,
  })
  status: ReviewStatus;

  @Column({ name: 'helpful_votes', default: 0 })
  helpfulVotes: number;

  @Column({ name: 'not_helpful_votes', default: 0 })
  notHelpfulVotes: number;

  // Stores user IDs who voted helpful (simple JSON array)
  @Column({ type: 'simple-json', name: 'helpful_voters', nullable: true })
  helpfulVoters: string[] = [];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
