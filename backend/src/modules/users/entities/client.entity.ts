import { ChildEntity, Column } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums';

/**
 * ============================================
 * 🎯 HÉRITAGE (Inheritance) - Classe Enfant Client
 * ============================================
 * 
 * La classe Client hérite de User (classe abstraite).
 * 
 * Concept POO appliqué:
 * - Héritage: Client extends User
 * - @ChildEntity() pour TypeORM STI
 * - Hérite de toutes les propriétés de User (id, email, name, etc.)
 * - Ajoute des propriétés spécifiques au client (loyaltyPoints, phoneNumber)
 * - Implémente la méthode abstraite getDisplayInfo() (polymorphisme)
 */

@ChildEntity()
export class Client extends User {
  /**
   * Points de fidélité du client
   */
  @Column({ name: 'loyalty_points', default: 0 })
  loyaltyPoints: number;

  /**
   * Numéro de téléphone
   */
  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  /**
   * Adresse de livraison par défaut
   */
  @Column({ name: 'default_shipping_address', type: 'text', nullable: true })
  defaultShippingAddress: string;

  constructor() {
    super();
    this.role = UserRole.CLIENT;
  }

  /**
   * 🎯 POLYMORPHISME: Implémentation spécifique pour Client
   * Chaque type d'utilisateur retourne une information différente
   */
  getDisplayInfo(): string {
    return `Client: ${this.name} (${this.email}) - Points: ${this.loyaltyPoints}`;
  }

  /**
   * Méthode métier spécifique aux clients
   */
  addLoyaltyPoints(points: number): void {
    if (points > 0) {
      this.loyaltyPoints += points;
    }
  }

  /**
   * Calcule les points de fidélité basés sur le montant d'achat
   */
  calculateLoyaltyPoints(orderAmount: number): number {
    // 1 point par 10€ dépensés
    return Math.floor(orderAmount / 10);
  }
}
