import {
  IPaymentStrategy,
  PaymentResult,
} from './payment-strategy.interface';

/**
 * ============================================
 * 🎯 POLYMORPHISME + STRATEGY PATTERN
 * Implémentation concrète: Paiement par PayPal
 * ============================================
 * 
 * Cette classe implémente IPaymentStrategy pour les paiements par PayPal.
 * 
 * Concept POO appliqué:
 * - Implémente la même interface que CardPaymentStrategy (polymorphisme)
 * - Fournit une stratégie alternative de paiement
 * - Peut être échangée avec CardPaymentStrategy sans modifier le code client
 * - Le PaymentService traite cette stratégie exactement comme la carte
 * 
 * Ceci démontre le pouvoir du polymorphisme: même interface, comportement différent!
 */

export interface PayPalPaymentDetails {
  email: string;
  password?: string; // En production, on utiliserait OAuth
  accountId?: string;
}

export class PayPalPaymentStrategy implements IPaymentStrategy {
  /**
   * 🎯 POLYMORPHISME: Implémentation spécifique pour PayPal
   * Traite le paiement via PayPal
   * 
   * Même signature que dans CardPaymentStrategy mais logique différente!
   */
  async processPayment(
    amount: number,
    details: PayPalPaymentDetails,
  ): Promise<PaymentResult> {
    // Validation des détails
    if (!this.validatePaymentInfo(details)) {
      return {
        success: false,
        transactionRef: '',
        message: 'Informations PayPal invalides',
        timestamp: new Date(),
      };
    }

    try {
      // 🔒 SIMULATION: Traitement du paiement PayPal
      // Dans un vrai système, on appellerait l'API PayPal
      
      // Masquer l'email pour la confidentialité
      const maskedEmail = this.maskEmail(details.email);
      
      // Simuler l'authentification PayPal
      const authenticated = await this.authenticatePayPal(details);
      
      if (!authenticated) {
        return {
          success: false,
          transactionRef: '',
          message: 'Authentification PayPal échouée',
          timestamp: new Date(),
        };
      }
      
      // Simuler un délai de traitement
      await this.simulatePaymentProcessing();
      
      // Vérifier le solde PayPal (simulation)
      const hasEnoughBalance = await this.checkPayPalBalance(details, amount);
      
      if (!hasEnoughBalance) {
        return {
          success: false,
          transactionRef: '',
          message: 'Solde PayPal insuffisant',
          timestamp: new Date(),
        };
      }
      
      // Générer une référence de transaction unique
      const transactionRef = this.generateTransactionRef('PAYPAL');
      
      return {
        success: true,
        transactionRef,
        message: `Paiement PayPal (${maskedEmail}) réussi`,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        transactionRef: '',
        message: `Erreur lors du paiement PayPal: ${error.message}`,
        timestamp: new Date(),
      };
    }
  }

  /**
   * 🎯 POLYMORPHISME: Validation spécifique à PayPal
   * Vérifie que les informations PayPal sont valides
   * 
   * Règles de validation différentes de la carte, mais même interface!
   */
  validatePaymentInfo(details: PayPalPaymentDetails): boolean {
    if (!details) return false;

    // Validation de l'email PayPal
    const emailValid = this.validateEmail(details.email);

    return emailValid;
  }

  /**
   * 🎯 POLYMORPHISME: Génération de reçu spécifique à PayPal
   * Format personnalisé pour les paiements PayPal (différent de la carte)
   */
  generateReceipt(transaction: any): string {
    const { amount, transactionRef, timestamp, email } = transaction;
    const maskedEmail = this.maskEmail(email);

    return `
╔════════════════════════════════════════╗
║       REÇU DE PAIEMENT - PAYPAL        ║
╠════════════════════════════════════════╣
║ Référence: ${transactionRef.padEnd(24)} ║
║ Date: ${new Date(timestamp).toLocaleString('fr-FR').padEnd(29)} ║
║ Compte: ${maskedEmail.padEnd(27)} ║
║ Montant: ${amount.toFixed(2).padStart(23)} € ║
╠════════════════════════════════════════╣
║    Transaction PayPal complétée ✓      ║
║      Protection acheteur active        ║
║      Merci pour votre achat !          ║
╚════════════════════════════════════════╝
    `.trim();
  }

  /**
   * Retourne le nom de la méthode de paiement
   */
  getPaymentMethodName(): string {
    return 'PayPal';
  }

  // ==========================================
  // MÉTHODES PRIVÉES (Helpers)
  // ==========================================

  /**
   * Valide le format de l'email
   */
  private validateEmail(email: string): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Masque l'email pour la confidentialité
   * exemple@email.com => e*****@email.com
   */
  private maskEmail(email: string): string {
    if (!email) return '';
    const [local, domain] = email.split('@');
    if (!domain) return email;
    
    const maskedLocal =
      local.length > 2
        ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1]
        : local[0] + '*';
    
    return `${maskedLocal}@${domain}`;
  }

  /**
   * Simule l'authentification avec PayPal
   */
  private async authenticatePayPal(
    details: PayPalPaymentDetails,
  ): Promise<boolean> {
    // 🔒 SIMULATION: Dans un vrai système, on utiliserait OAuth 2.0
    // Pour la démo, on accepte tous les emails valides
    return this.validateEmail(details.email);
  }

  /**
   * Simule la vérification du solde PayPal
   */
  private async checkPayPalBalance(
    details: PayPalPaymentDetails,
    amount: number,
  ): Promise<boolean> {
    // 🔒 SIMULATION: Dans un vrai système, on interrogerait l'API PayPal
    // Pour la démo, on accepte les paiements < 5000€
    return amount < 5000;
  }

  /**
   * Simule un délai de traitement du paiement
   */
  private async simulatePaymentProcessing(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 700));
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
