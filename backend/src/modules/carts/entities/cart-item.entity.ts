import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../../products/entities/product.entity';

/**
 * ============================================
 * 🎯 COMPOSITION (Composition) - Partie composée
 * ============================================
 * 
 * CartItem est l'élément composé du Cart.
 * 
 * Concept POO appliqué:
 * - CartItem fait partie de Cart (relation de composition)
 * - @ManyToOne vers Cart (plusieurs items appartiennent à un panier)
 * - Référence aussi Product pour connaître le produit
 * - Snapshot du prix pour garder l'historique
 */

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 🎯 COMPOSITION: Référence vers le Cart parent
   * ManyToOne - Plusieurs items appartiennent à un panier
   */
  @ManyToOne(() => Cart, (cart) => cart.items, {
    onDelete: 'CASCADE', // Si le panier est supprimé, les items le sont aussi
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({ name: 'cart_id' })
  cartId: string;

  /**
   * Référence vers le produit
   */
  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'product_id' })
  productId: string;

  /**
   * Quantité du produit dans le panier
   */
  @Column({ default: 1 })
  quantity: number;

  /**
   * 🎯 ENCAPSULATION: Snapshot du prix au moment de l'ajout
   * Permet de garder le prix même si le produit change de prix
   */
  @Column('decimal', { precision: 10, scale: 2, name: 'unit_price_snapshot' })
  unitPriceSnapshot: number;

  // ==========================================
  // 🔒 MÉTHODES MÉTIER
  // ==========================================

  /**
   * 🎯 ENCAPSULATION: Calcule le total de la ligne
   * (quantité × prix unitaire)
   */
  public getLineTotal(): number {
    return Number((this.quantity * this.unitPriceSnapshot).toFixed(2));
  }

  /**
   * 🎯 ENCAPSULATION: Définit la quantité avec validation
   */
  public setQuantity(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('La quantité doit être supérieure à 0');
    }
    if (quantity > 999) {
      throw new Error('La quantité maximale est 999');
    }
    this.quantity = Math.floor(quantity);
  }

  /**
   * 🎯 ENCAPSULATION: Incrémente la quantité
   */
  public increaseQuantity(amount: number = 1): void {
    if (amount <= 0) {
      throw new Error('Le montant doit être positif');
    }
    this.quantity += amount;
    
    if (this.quantity > 999) {
      this.quantity = 999;
    }
  }

  /**
   * 🎯 ENCAPSULATION: Décrémente la quantité
   */
  public decreaseQuantity(amount: number = 1): void {
    if (amount <= 0) {
      throw new Error('Le montant doit être positif');
    }
    
    this.quantity -= amount;
    
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }

  /**
   * Capture le prix actuel du produit comme snapshot
   */
  public snapshotPrice(): void {
    if (this.product) {
      this.unitPriceSnapshot = this.product.getPrice();
    }
  }

  /**
   * Vérifie si le prix a changé depuis le snapshot
   */
  public hasPriceChanged(): boolean {
    if (!this.product) return false;
    return this.unitPriceSnapshot !== this.product.getPrice();
  }
}
