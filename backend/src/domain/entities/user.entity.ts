/**
 * ============================================
 * 🧬 HÉRITAGE (Inheritance) - Classe Parente
 * ============================================
 *
 * User est une classe ABSTRAITE qui sert de classe parente pour:
 * - Client (extends User)
 * - Admin (extends User)
 *
 * TypeORM utilise le pattern "Single Table Inheritance" (STI):
 * → Tous les types d'utilisateurs sont stockés dans UNE SEULE table 'users'
 * → Une colonne 'type' discrimine les sous-classes (Client vs Admin)
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  TableInheritance,
} from 'typeorm';
import { UserRole } from '../enums';

/**
 * Classe ABSTRAITE User
 *
 * @TableInheritance() indique que cette entité utilise l'héritage STI
 * La colonne 'type' stocke le discriminateur ('client' ou 'admin')
 */
@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class User {
  /**
   * 🔒 ENCAPSULATION: Propriétés communes à tous les utilisateurs
   */

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ default: false })
  isBlocked: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /**
   * 🧬 HÉRITAGE: Méthode ABSTRAITE
   *
   * Chaque classe enfant DOIT implémenter cette méthode.
   * Cela garantit que Client et Admin fourniront leur propre version.
   *
   * 🎭 POLYMORPHISME: Cette méthode aura un comportement différent
   * selon que l'objet est un Client ou un Admin.
   */
  abstract getDisplayInfo(): string;

  /**
   * 🔒 ENCAPSULATION: Méthode de validation
   */
  public validate(): boolean {
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Email invalide');
    }
    if (!this.name || this.name.trim().length < 2) {
      throw new Error('Le nom doit contenir au moins 2 caractères');
    }
    return true;
  }

  /**
   * 🔒 ENCAPSULATION: Méthode pour obtenir une représentation sûre
   * Retourne les données sans le hash du mot de passe
   */
  public toPublicJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
