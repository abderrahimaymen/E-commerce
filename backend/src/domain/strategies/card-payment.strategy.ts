import {
  IPaymentStrategy,
  PaymentResult,
} from './payment-strategy.interface';

/**
 * ============================================
 * 🎯 POLYMORPHISME + STRATEGY PATTERN
 * Implémentation concrète: Paiement par Carte
 * ============================================
 * 
 * Cette classe implémente IPaymentStrategy pour les paiements par carte bancaire.
 * 
 * Concept POO appliqué:
 * - Implémente l'interface IPaymentStrategy (polymorphisme)
 * - Fournit une stratégie spécifique de paiement
 * - Peut être échangée avec d'autres stratégies sans changer le code client
 * - Le PaymentService peut utiliser cette stratégie de façon transparente
 */

export interface CardPaymentDetails {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string; // Format: MM/YY
  cvv: string;
}

export class CardPaymentStrategy implements IPaymentStrategy {
  /**
   * 🎯 POLYMORPHISME: Implémentation spécifique pour carte
   * Traite le paiement par carte bancaire
   */
  async processPayment(
    amount: number,
    details: CardPaymentDetails,
  ): Promise<PaymentResult> {
    // Validation des détails
    if (!this.validatePaymentInfo(details)) {
      return {
        success: false,
        transactionRef: '',
        message: 'Informations de carte invalides',
        timestamp: new Date(),
      };
    }

    try {
      // 🔒 SIMULATION: Traitement du paiement par carte
      // Dans un vrai système, on appellerait une API de paiement (Stripe, PayPal, etc.)
      
      // Masquer le numéro de carte pour la sécurité
      const maskedCard = this.maskCardNumber(details.cardNumber);
      
      // Simuler un délai de traitement
      await this.simulatePaymentProcessing();
      
      // Vérifier les fonds (simulation)
      const hasEnoughFunds = await this.checkCardFunds(details, amount);
      
      if (!hasEnoughFunds) {
        return {
          success: false,
          transactionRef: '',
          message: 'Fonds insuffisants sur la carte',
          timestamp: new Date(),
        };
      }
      
      // Générer une référence de transaction unique
      const transactionRef = this.generateTransactionRef('CARD');
      
      return {
        success: true,
        transactionRef,
        message: `Paiement par carte ${maskedCard} réussi`,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        transactionRef: '',
        message: `Erreur lors du paiement: ${error.message}`,
        timestamp: new Date(),
      };
    }
  }

  /**
   * 🎯 POLYMORPHISME: Validation spécifique aux cartes
   * Vérifie que les informations de carte sont valides
   */
  validatePaymentInfo(details: CardPaymentDetails): boolean {
    if (!details) return false;

    // Validation du numéro de carte (doit être numérique et 16 chiffres)
    const cardNumberValid =
      details.cardNumber &&
      /^\d{16}$/.test(details.cardNumber.replace(/\s/g, ''));

    // Validation du nom
    const nameValid =
      details.cardHolderName && details.cardHolderName.trim().length >= 3;

    // Validation de la date d'expiration (MM/YY)
    const expiryValid = this.validateExpiryDate(details.expiryDate);

    // Validation du CVV (3 ou 4 chiffres)
    const cvvValid = details.cvv && /^\d{3,4}$/.test(details.cvv);

    return cardNumberValid && nameValid && expiryValid && cvvValid;
  }

  /**
   * 🎯 POLYMORPHISME: Génération de reçu spécifique aux cartes
   * Format personnalisé pour les paiements par carte
   */
  generateReceipt(transaction: any): string {
    const { amount, transactionRef, timestamp, cardNumber } = transaction;
    const maskedCard = this.maskCardNumber(cardNumber);

    return `
╔════════════════════════════════════════╗
║        REÇU DE PAIEMENT - CARTE        ║
╠════════════════════════════════════════╣
║ Référence: ${transactionRef.padEnd(24)} ║
║ Date: ${new Date(timestamp).toLocaleString('fr-FR').padEnd(29)} ║
║ Carte: ${maskedCard.padEnd(29)} ║
║ Montant: ${amount.toFixed(2).padStart(23)} € ║
╠════════════════════════════════════════╣
║         Paiement autorisé ✓            ║
║      Merci pour votre achat !          ║
╚════════════════════════════════════════╝
    `.trim();
  }

  /**
   * Retourne le nom de la méthode de paiement
   */
  getPaymentMethodName(): string {
    return 'Carte Bancaire';
  }

  // ==========================================
  // MÉTHODES PRIVÉES (Helpers)
  // ==========================================

  /**
   * Masque le numéro de carte pour la sécurité
   * Affiche uniquement les 4 derniers chiffres
   */
  private maskCardNumber(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, '');
    return `**** **** **** ${cleaned.slice(-4)}`;
  }

  /**
   * Valide la date d'expiration de la carte
   */
  private validateExpiryDate(expiryDate: string): boolean {
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return false;
    }

    const [month, year] = expiryDate.split('/').map(Number);
    
    // Vérifier que le mois est valide
    if (month < 1 || month > 12) {
      return false;
    }

    // Vérifier que la carte n'est pas expirée
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // 2 derniers chiffres
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }

    return true;
  }

  /**
   * Simule la vérification des fonds disponibles
   */
  private async checkCardFunds(
    details: CardPaymentDetails,
    amount: number,
  ): Promise<boolean> {
    // 🔒 SIMULATION: Dans un vrai système, on interrogerait la banque
    // Pour la démo, on accepte les paiements < 10000€
    return amount < 10000;
  }

  /**
   * Simule un délai de traitement du paiement
   */
  private async simulatePaymentProcessing(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  /**
   * Génère une référence de transaction unique
   */
  private generateTransactionRef(prefix: string): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}-${timestamp}-${random}`;
  }
}
