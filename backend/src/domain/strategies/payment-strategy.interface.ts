/**
 * ============================================
 * 🎯 POLYMORPHISME + STRATEGY PATTERN - Interface
 * ============================================
 * 
 * Interface définissant le contrat pour toutes les stratégies de paiement.
 * 
 * Concept POO appliqué:
 * - Polymorphisme: Toutes les stratégies implémentent la même interface
 * - Strategy Pattern: Permet de choisir l'algorithme de paiement à l'exécution
 * - Les clients peuvent utiliser n'importe quelle stratégie de manière interchangeable
 * 
 * Le contexte (PaymentService) ne connaît que cette interface,
 * pas les implémentations concrètes.
 */

export interface PaymentResult {
  success: boolean;
  transactionRef: string;
  message: string;
  timestamp: Date;
}

export interface IPaymentStrategy {
  /**
   * 🎯 POLYMORPHISME: Méthode polymorphe
   * Traite le paiement selon la stratégie choisie
   * Chaque implémentation a sa propre logique
   * 
   * @param amount - Montant à payer
   * @param details - Détails spécifiques au mode de paiement
   * @returns Résultat du paiement
   */
  processPayment(amount: number, details: any): Promise<PaymentResult>;

  /**
   * 🎯 POLYMORPHISME: Méthode polymorphe
   * Valide les informations de paiement avant traitement
   * Chaque stratégie a ses propres règles de validation
   * 
   * @param details - Détails à valider
   * @returns true si valide, false sinon
   */
  validatePaymentInfo(details: any): boolean;

  /**
   * 🎯 POLYMORPHISME: Méthode polymorphe
   * Génère un reçu au format texte
   * Chaque stratégie peut personnaliser le format
   * 
   * @param transaction - Informations de la transaction
   * @returns Reçu au format string
   */
  generateReceipt(transaction: any): string;

  /**
   * Retourne le nom de la méthode de paiement
   */
  getPaymentMethodName(): string;
}
