import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CartItem } from './cart-item.entity';
import { User } from '../../../domain/entities/user.entity';

/**
 * ============================================
 * 🎯 COMPOSITION (Composition)
 * ============================================
 * 
 * La classe Cart démontre la composition via:
 * - Cart "possède" des CartItems (relation has-a)
 * - @OneToMany vers CartItem
 * - Le panier ne peut exister sans ses items
 * - La suppression du panier entraîne la suppression des items
 * 
 * Principe: Un objet complexe est composé d'autres objets
 * Cart = conteneur de CartItems
 */

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 🎯 COMPOSITION: Le panier contient une collection de CartItems
   * Relation OneToMany - Un panier a plusieurs items
   * Cascade: true signifie que les opérations sur Cart affectent les CartItems
   */
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,
    eager: true,
  })
  items: CartItem[];

  /**
   * Propriétaire du panier
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    // Note: items relation should not be initialized here per TypeORM requirements
  }

  // ==========================================
  // 🔒 MÉTHODES MÉTIER utilisant la composition
  // ==========================================

  /**
   * 🎯 COMPOSITION: Méthode qui travaille avec les items composés
   * Calcule le total du panier en sommant tous les items
   */
  public calculateTotal(): number {
    if (!this.items || this.items.length === 0) {
      return 0;
    }

    // Utilise les CartItems composés pour calculer le total
    const total = this.items.reduce((sum, item) => {
      return sum + item.getLineTotal();
    }, 0);

    return Number(total.toFixed(2));
  }

  /**
   * 🎯 COMPOSITION: Trouve un item spécifique dans le panier
   * Recherche parmi les items composés
   */
  public findItemByProductId(productId: string): CartItem | undefined {
    return this.items.find(item => item.productId === productId);
  }

  /**
   * 🎯 COMPOSITION: Vérifie si un produit existe déjà dans le panier
   */
  public hasProduct(productId: string): boolean {
    return this.items.some(item => item.productId === productId);
  }

  /**
   * 🎯 COMPOSITION: Compte le nombre total d'items dans le panier
   */
  public getTotalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * 🎯 COMPOSITION: Vérifie si le panier est vide
   */
  public isEmpty(): boolean {
    return !this.items || this.items.length === 0;
  }

  /**
   * 🎯 COMPOSITION: Ajoute un item au panier
   * Si le produit existe déjà, on incrémente la quantité
   */
  public addItem(cartItem: CartItem): void {
    const existingItem = this.findItemByProductId(cartItem.productId);
    
    if (existingItem) {
      // Produit déjà dans le panier: incrémenter la quantité
      existingItem.increaseQuantity(cartItem.quantity);
    } else {
      // Nouveau produit: ajouter à la collection
      this.items.push(cartItem);
    }
  }

  /**
   * 🎯 COMPOSITION: Supprime un item du panier
   */
  public removeItem(productId: string): boolean {
    const index = this.items.findIndex(item => item.productId === productId);
    
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * 🎯 COMPOSITION: Vide complètement le panier
   */
  public clear(): void {
    this.items = [];
  }

  /**
   * 🎯 COMPOSITION: Met à jour la quantité d'un item
   */
  public updateItemQuantity(productId: string, quantity: number): boolean {
    const item = this.findItemByProductId(productId);
    
    if (item) {
      item.setQuantity(quantity);
      return true;
    }
    return false;
  }

  /**
   * 🎯 COMPOSITION: Retourne un résumé du panier
   * Utilise les données des items composés
   */
  public getSummary() {
    return {
      totalItems: this.getTotalItems(),
      itemCount: this.items.length,
      subtotal: this.calculateTotal(),
      isEmpty: this.isEmpty(),
      items: this.items.map(item => ({
        productId: item.productId,
        productName: item.product?.getName() || 'Unknown',
        quantity: item.quantity,
        unitPrice: item.unitPriceSnapshot,
        lineTotal: item.getLineTotal(),
      })),
    };
  }
}
