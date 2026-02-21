import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

/**
 * Entité Stock - Gestion du stock des produits
 * 
 * Cette classe utilise aussi l'encapsulation pour contrôler
 * l'accès et la modification du stock
 */

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 🔒 ENCAPSULATION: Quantité en stock (privée)
   */
  @Column({ default: 0 })
  private quantity: number;

  /**
   * Seuil d'alerte pour stock bas
   */
  @Column({ name: 'low_threshold', default: 10 })
  private lowThreshold: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /**
   * Relation OneToOne avec Product
   */
  @OneToOne(() => Product, (product) => product.stock)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'product_id', unique: true })
  productId: string;

  // ==========================================
  // 🔒 GETTERS
  // ==========================================

  public getQuantity(): number {
    return this.quantity;
  }

  public getLowThreshold(): number {
    return this.lowThreshold;
  }

  // ==========================================
  // 🔒 SETTERS avec validation
  // ==========================================

  /**
   * 🎯 ENCAPSULATION: Setter avec validation
   * La quantité ne peut pas être négative
   */
  public setQuantity(quantity: number): void {
    if (quantity < 0) {
      throw new Error('La quantité ne peut pas être négative');
    }
    this.quantity = Math.floor(quantity); // Arrondi à l'entier inférieur
  }

  public setLowThreshold(threshold: number): void {
    if (threshold < 0) {
      throw new Error('Le seuil ne peut pas être négatif');
    }
    this.lowThreshold = Math.floor(threshold);
  }

  // ==========================================
  // 🔒 MÉTHODES MÉTIER
  // ==========================================

  /**
   * 🎯 ENCAPSULATION: Méthode métier pour décrémenter le stock
   * Utilisée lors de la validation d'une commande
   * 
   * @throws Error si stock insuffisant
   */
  public decreaseStock(amount: number): void {
    if (amount <= 0) {
      throw new Error('Le montant doit être positif');
    }
    if (this.quantity < amount) {
      throw new Error(`Stock insuffisant. Disponible: ${this.quantity}, Demandé: ${amount}`);
    }
    this.quantity -= amount;
  }

  /**
   * 🎯 ENCAPSULATION: Méthode métier pour incrémenter le stock
   * Utilisée lors d'un réapprovisionnement
   */
  public increaseStock(amount: number): void {
    if (amount <= 0) {
      throw new Error('Le montant doit être positif');
    }
    this.quantity += amount;
  }

  /**
   * Vérifie si le stock est suffisant pour une quantité donnée
   */
  public hasEnoughStock(amount: number): boolean {
    return this.quantity >= amount;
  }

  /**
   * Vérifie si le stock est en dessous du seuil
   */
  public isLow(): boolean {
    return this.quantity <= this.lowThreshold;
  }

  /**
   * Vérifie si le stock est épuisé
   */
  public isEmpty(): boolean {
    return this.quantity === 0;
  }
}
