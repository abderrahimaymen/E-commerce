import { CardPaymentStrategy } from '../src/domain/strategies/card-payment.strategy';
import { PayPalPaymentStrategy } from '../src/domain/strategies/paypal-payment.strategy';

/**
 * ============================================
 * 🎯 TESTS - Strategy Pattern & Polymorphisme
 * ============================================
 * 
 * Ces tests démontrent:
 * - Le fonctionnement du Strategy Pattern
 * - Le polymorphisme: même interface, comportements différents
 * - La validation spécifique à chaque stratégie
 */

describe('Payment Strategies - Strategy Pattern', () => {
  describe('CardPaymentStrategy', () => {
    let strategy: CardPaymentStrategy;

    beforeEach(() => {
      strategy = new CardPaymentStrategy();
    });

    it('devrait valider des informations de carte valides', () => {
      const validCardInfo = {
        cardNumber: '1234567812345678',
        cardHolderName: 'John Doe',
        expiryDate: '12/25',
        cvv: '123',
      };

      expect(strategy.validatePaymentInfo(validCardInfo)).toBe(true);
    });

    it('devrait rejeter une carte avec un numéro invalide', () => {
      const invalidCardInfo = {
        cardNumber: '123',
        cardHolderName: 'John Doe',
        expiryDate: '12/25',
        cvv: '123',
      };

      expect(strategy.validatePaymentInfo(invalidCardInfo)).toBe(false);
    });

    it('devrait rejeter une carte avec CVV invalide', () => {
      const invalidCardInfo = {
        cardNumber: '1234567812345678',
        cardHolderName: 'John Doe',
        expiryDate: '12/25',
        cvv: '12', // Trop court
      };

      expect(strategy.validatePaymentInfo(invalidCardInfo)).toBe(false);
    });

    it('devrait traiter un paiement valide avec succès', async () => {
      const validCardInfo = {
        cardNumber: '1234567812345678',
        cardHolderName: 'John Doe',
        expiryDate: '12/25',
        cvv: '123',
      };

      const result = await strategy.processPayment(100, validCardInfo);

      expect(result.success).toBe(true);
      expect(result.transactionRef).toContain('CARD-');
      // La stratégie retourne un résultat avec success et transactionRef
    });

    it('devrait générer un reçu pour une transaction', () => {
      const transaction = {
        amount: 100,
        transactionRef: 'CARD-123456',
        timestamp: new Date(),
        cardNumber: '1234567812345678',
      };

      const receipt = strategy.generateReceipt(transaction);

      expect(receipt).toContain('REÇU DE PAIEMENT - CARTE');
      expect(receipt).toContain('CARD-123456');
      expect(receipt).toContain('**** **** **** 5678');
    });

    it('devrait retourner le bon nom de méthode', () => {
      expect(strategy.getPaymentMethodName()).toBe('Carte Bancaire');
    });
  });

  describe('PayPalPaymentStrategy', () => {
    let strategy: PayPalPaymentStrategy;

    beforeEach(() => {
      strategy = new PayPalPaymentStrategy();
    });

    it('devrait valider un email PayPal valide', () => {
      const validPayPalInfo = {
        email: 'user@example.com',
      };

      expect(strategy.validatePaymentInfo(validPayPalInfo)).toBe(true);
    });

    it('devrait rejeter un email PayPal invalide', () => {
      const invalidPayPalInfo = {
        email: 'invalid-email',
      };

      expect(strategy.validatePaymentInfo(invalidPayPalInfo)).toBe(false);
    });

    it('devrait traiter un paiement PayPal avec succès', async () => {
      const validPayPalInfo = {
        email: 'user@example.com',
      };

      const result = await strategy.processPayment(50, validPayPalInfo);

      expect(result.success).toBe(true);
      expect(result.transactionRef).toContain('PAYPAL-');
    });

    it('devrait générer un reçu PayPal', () => {
      const transaction = {
        amount: 50,
        transactionRef: 'PAYPAL-789012',
        timestamp: new Date(),
        email: 'user@example.com',
      };

      const receipt = strategy.generateReceipt(transaction);

      expect(receipt).toContain('REÇU DE PAIEMENT - PAYPAL');
      expect(receipt).toContain('PAYPAL-789012');
      expect(receipt).toContain('u***@example.com'); // Email masqué
    });

    it('devrait retourner le bon nom de méthode', () => {
      expect(strategy.getPaymentMethodName()).toBe('PayPal');
    });
  });

  /**
   * 🎯 POLYMORPHISME: Test de l'interchangeabilité des stratégies
   * Les deux stratégies implémentent la même interface et peuvent être utilisées de façon identique
   */
  describe('Polymorphisme - Interchangeabilité des stratégies', () => {
    it('devrait pouvoir utiliser les deux stratégies de manière polymorphe', async () => {
      const strategies = [
        new CardPaymentStrategy(),
        new PayPalPaymentStrategy(),
      ];

      // 🎯 POLYMORPHISME: On peut traiter toutes les stratégies de la même façon
      for (const strategy of strategies) {
        expect(typeof strategy.getPaymentMethodName()).toBe('string');
        expect(typeof strategy.validatePaymentInfo).toBe('function');
        expect(typeof strategy.processPayment).toBe('function');
        expect(typeof strategy.generateReceipt).toBe('function');
      }
    });
  });
});
