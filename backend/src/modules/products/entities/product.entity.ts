import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Stock } from './stock.entity';

/**
 * ============================================
 * 🎯 ENCAPSULATION (Encapsulation)
 * ============================================
 * 
 * Cette classe Product démontre l'encapsulation via:
 * - Propriétés privées (private)
 * - Getters publics pour l'accès en lecture
 * - Setters avec validation pour contrôler les modifications
 * - Méthodes métier qui encapsulent la logique
 * 
 * Principe: Les données sont protégées et ne peuvent être modifiées
 * que via des méthodes qui garantissent la cohérence.
 */

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 🔒 ENCAPSULATION: Propriété privée avec getter/setter
   * Le nom ne peut pas être vide
   */
  @Column()
  private name: string;

  /**
   * 🔒 ENCAPSULATION: Propriété privée avec getter/setter
   * Le prix ne peut pas être négatif ou zéro
   */
  @Column('decimal', { precision: 10, scale: 2 })
  private price: number;

  @Column('text', { nullable: true })
  private description: string;

  @Column({ nullable: true })
  private image: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ nullable: true })
  private category: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /**
   * Relation avec Stock (OneToOne)
   */
  @OneToOne(() => Stock, (stock) => stock.product, { eager: true })
  stock: Stock;

  // ==========================================
  // 🔒 GETTERS - Accès contrôlé en lecture
  // ==========================================

  /**
   * 🎯 ENCAPSULATION: Getter public pour accéder au nom
   */
  public getName(): string {
    return this.name;
  }

  /**
   * 🎯 ENCAPSULATION: Getter public pour accéder au prix
   */
  public getPrice(): number {
    return this.price;
  }

  public getDescription(): string {
    return this.description;
  }

  public getImage(): string {
    return this.image;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getCategory(): string {
    return this.category;
  }

  /**
   * 🎯 ENCAPSULATION: Getter calculé
   * Retourne true si le produit est en rupture de stock
   */
  public isOutOfStock(): boolean {
    return this.stock ? this.stock.getQuantity() <= 0 : true;
  }

  /**
   * 🎯 ENCAPSULATION: Getter calculé
   * Retourne true si le stock est bas
   */
  public isLowStock(): boolean {
    if (!this.stock) return false;
    return this.stock.getQuantity() <= this.stock.getLowThreshold();
  }

  // ==========================================
  // 🔒 SETTERS - Modification contrôlée avec validation
  // ==========================================

  /**
   * 🎯 ENCAPSULATION: Setter avec validation
   * Le nom ne peut pas être vide ou null
   * 
   * @throws Error si le nom est invalide
   */
  public setName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Le nom du produit ne peut pas être vide');
    }
    if (name.length > 255) {
      throw new Error('Le nom du produit est trop long (max 255 caractères)');
    }
    this.name = name.trim();
  }

  /**
   * 🎯 ENCAPSULATION: Setter avec validation
   * Le prix doit être strictement positif
   * 
   * @throws Error si le prix est invalide
   */
  public setPrice(price: number): void {
    if (price <= 0) {
      throw new Error('Le prix doit être supérieur à 0');
    }
    if (price > 1000000) {
      throw new Error('Le prix est trop élevé');
    }
    this.price = Number(price.toFixed(2)); // Arrondi à 2 décimales
  }

  public setDescription(description: string): void {
    this.description = description?.trim() || '';
  }

  public setImage(image: string): void {
    this.image = image?.trim() || '';
  }

  /**
   * 🎯 ENCAPSULATION: Setter avec validation
   * Désactiver un produit plutôt que de le supprimer (soft delete)
   */
  public setIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }

  public setCategory(category: string): void {
    this.category = category?.trim() || '';
  }

  // ==========================================
  // 🔒 MÉTHODES MÉTIER (Business Logic)
  // ==========================================

  /**
   * 🎯 ENCAPSULATION: Méthode métier qui encapsule la logique
   * Active le produit uniquement si les conditions sont remplies
   */
  public activate(): void {
    if (!this.name || !this.price) {
      throw new Error('Le produit doit avoir un nom et un prix avant d\'être activé');
    }
    this.isActive = true;
  }

  /**
   * 🎯 ENCAPSULATION: Méthode métier
   * Désactive le produit (soft delete)
   */
  public deactivate(): void {
    this.isActive = false;
  }

  /**
   * 🎯 ENCAPSULATION: Méthode métier
   * Calcule le prix avec une réduction
   */
  public calculateDiscountedPrice(discountPercent: number): number {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error('Le pourcentage de réduction doit être entre 0 et 100');
    }
    const discount = this.price * (discountPercent / 100);
    return Number((this.price - discount).toFixed(2));
  }

  /**
   * 🎯 ENCAPSULATION: Méthode de validation complète
   * Valide que le produit est dans un état cohérent
   */
  public validate(): boolean {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Le produit doit avoir un nom');
    }
    if (this.price <= 0) {
      throw new Error('Le produit doit avoir un prix valide');
    }
    return true;
  }

  /**
   * 🎯 ENCAPSULATION: Méthode pour obtenir une représentation sûre du produit
   * Retourne uniquement les données publiques (pour les API responses)
   */
  public toPublicJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      image: this.image,
      category: this.category,
      isActive: this.isActive,
      inStock: !this.isOutOfStock(),
      lowStock: this.isLowStock(),
      stockQuantity: this.stock?.getQuantity() || 0,
    };
  }
}
