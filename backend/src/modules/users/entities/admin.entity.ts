import { ChildEntity, Column } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums';

/**
 * ============================================
 * 🎯 HÉRITAGE (Inheritance) - Classe Enfant Admin
 * ============================================
 * 
 * La classe Admin hérite de User (classe abstraite).
 * 
 * Concept POO appliqué:
 * - Héritage: Admin extends User
 * - @ChildEntity() pour TypeORM STI
 * - Hérite de toutes les propriétés de User
 * - Ajoute des propriétés spécifiques à l'admin (department, permissions)
 * - Implémente la méthode abstraite getDisplayInfo() (polymorphisme)
 */

@ChildEntity()
export class Admin extends User {
  /**
   * Département de l'administrateur
   */
  @Column({ nullable: true })
  department: string;

  /**
   * Niveau d'accès (1-10, 10 étant super admin)
   */
  @Column({ name: 'access_level', default: 5 })
  accessLevel: number;

  /**
   * Permissions spéciales (JSON array)
   */
  @Column({ type: 'simple-json', nullable: true })
  permissions: string[];

  constructor() {
    super();
    this.role = UserRole.ADMIN;
  }

  /**
   * 🎯 POLYMORPHISME: Implémentation spécifique pour Admin
   * Chaque type d'utilisateur retourne une information différente
   */
  getDisplayInfo(): string {
    return `Admin: ${this.name} (${this.department || 'General'}) - Level: ${this.accessLevel}`;
  }

  /**
   * Vérifie si l'admin a une permission spécifique
   */
  hasPermission(permission: string): boolean {
    if (this.accessLevel >= 10) {
      return true; // Super admin a toutes les permissions
    }
    return this.permissions?.includes(permission) || false;
  }

  /**
   * Ajoute une permission à l'admin
   */
  grantPermission(permission: string): void {
    if (!this.permissions) {
      this.permissions = [];
    }
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
    }
  }
}
