import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

/**
 * ❤️ WishlistItem — Produit sauvegardé par un utilisateur
 */
@Entity('wishlist_items')
export class WishlistItem {
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

  // Prix au moment de l'ajout — pour détecter les baisses de prix
  @Column('decimal', { precision: 10, scale: 2, name: 'price_at_addition' })
  priceAtAddition: number;

  @CreateDateColumn({ name: 'added_at' })
  addedAt: Date;
}
