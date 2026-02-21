/**
 * ============================================
 * 🎯 ENUMS - Types énumérés pour le domaine
 * ============================================
 */

/**
 * Rôles des utilisateurs dans le système
 */
export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

/**
 * Statuts des commandes
 */
export enum OrderStatus {
  EN_ATTENTE = 'EN_ATTENTE', // En attente de paiement
  PAYEE = 'PAYEE', // Payée
  EN_PREPARATION = 'EN_PREPARATION', // En cours de préparation
  EXPEDIEE = 'EXPEDIEE', // Expédiée
  LIVREE = 'LIVREE', // Livrée
  ANNULEE = 'ANNULEE', // Annulée
  REMBOURSEE = 'REMBOURSEE', // Remboursée
}

/**
 * Méthodes de paiement disponibles
 */
export enum PaymentMethod {
  CARD = 'CARD', // Carte bancaire
  PAYPAL = 'PAYPAL', // PayPal
  BANK_TRANSFER = 'BANK_TRANSFER', // Virement bancaire
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY', // Paiement à la livraison
}

/**
 * Statuts des paiements
 */
export enum PaymentStatus {
  PENDING = 'PENDING', // En attente
  COMPLETED = 'COMPLETED', // Complété
  FAILED = 'FAILED', // Échoué
  REFUNDED = 'REFUNDED', // Remboursé
  CANCELLED = 'CANCELLED', // Annulé
}

/**
 * Types de promotions
 */
export enum PromoType {
  PERCENT = 'PERCENT', // Pourcentage de réduction
  FIXED = 'FIXED', // Montant fixe de réduction
}

/**
 * Statuts des avis produits
 */
export enum ReviewStatus {
  PENDING = 'PENDING',     // En attente de modération
  APPROVED = 'APPROVED',   // Approuvé
  REJECTED = 'REJECTED',   // Rejeté
}

/**
 * Statuts de livraison
 */
export enum DeliveryStatus {
  PENDING = 'PENDING', // En attente
  IN_TRANSIT = 'IN_TRANSIT', // En transit
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY', // En cours de livraison
  DELIVERED = 'DELIVERED', // Livré
  FAILED = 'FAILED', // Échec de livraison
  RETURNED = 'RETURNED', // Retourné
}
