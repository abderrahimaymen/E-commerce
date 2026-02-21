import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { Order } from '../../orders/entities/order.entity';
import { PaymentMethod, PaymentStatus } from '../../../domain/enums';
import { IPaymentStrategy } from '../../../domain/strategies/payment-strategy.interface';
import { CardPaymentStrategy } from '../../../domain/strategies/card-payment.strategy';
import { PayPalPaymentStrategy } from '../../../domain/strategies/paypal-payment.strategy';

/**
 * ============================================
 * 🎯 STRATEGY PATTERN - Context (Service)
 * ============================================
 * 
 * Ce service démontre le Strategy Pattern en action:
 * - Sélectionne dynamiquement la stratégie de paiement à utiliser
 * - Ne connaît que l'interface IPaymentStrategy, pas les implémentations
 * - Peut facilement ajouter de nouvelles stratégies sans modifier ce code
 * 
 * Pattern utilisé:
 * - Factory pour créer la bonne stratégie selon la méthode
 * - Polymorphisme pour appeler les méthodes de façon uniforme
 */

@Injectable()
export class PaymentService {
  /**
   * 🎯 STRATEGY PATTERN: Registry des stratégies disponibles
   * Mapping entre PaymentMethod et la stratégie correspondante
   */
  private strategies: Map<PaymentMethod, IPaymentStrategy>;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    // 🎯 STRATEGY PATTERN: Initialisation des stratégies disponibles
    this.initializeStrategies();
  }

  /**
   * 🎯 STRATEGY PATTERN: Initialise le registry des stratégies
   * Enregistre toutes les stratégies de paiement disponibles
   */
  private initializeStrategies(): void {
    this.strategies = new Map<PaymentMethod, IPaymentStrategy>();
    
    // Enregistrer la stratégie de paiement par carte
    this.strategies.set(PaymentMethod.CARD, new CardPaymentStrategy());
    
    // Enregistrer la stratégie de paiement par PayPal
    this.strategies.set(PaymentMethod.PAYPAL, new PayPalPaymentStrategy());
    
    // 💡 Pour ajouter une nouvelle stratégie (ex: Crypto):
    // this.strategies.set(PaymentMethod.CRYPTO, new CryptoPaymentStrategy());
  }

  /**
   * 🎯 STRATEGY PATTERN: Factory Method
   * Sélectionne et retourne la stratégie appropriée
   * 
   * @param method - Méthode de paiement choisie
   * @returns La stratégie de paiement correspondante
   */
  private getPaymentStrategy(method: PaymentMethod): IPaymentStrategy {
    const strategy = this.strategies.get(method);
    
    if (!strategy) {
      throw new BadRequestException(
        `Méthode de paiement non supportée: ${method}`,
      );
    }
    
    return strategy;
  }

  /**
   * 🎯 STRATEGY PATTERN + POLYMORPHISME: Traite un paiement
   * 
   * Cette méthode démontre le pouvoir du pattern Strategy:
   * 1. Sélectionne dynamiquement la stratégie selon 'method'
   * 2. Appelle processPayment() de façon polymorphe
   * 3. Le comportement change selon la stratégie choisie
   * 4. Le code client reste identique quelle que soit la stratégie
   */
  async processPayment(
    orderId: string,
    method: PaymentMethod,
    paymentDetails: any,
  ): Promise<Payment> {
    // Vérifier que la commande existe
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Commande introuvable');
    }

    // Vérifier qu'il n'y a pas déjà un paiement pour cette commande
    const existingPayment = await this.paymentRepository.findOne({
      where: { orderId },
    });

    if (existingPayment) {
      throw new BadRequestException('Un paiement existe déjà pour cette commande');
    }

    // 🎯 STRATEGY PATTERN: Sélection dynamique de la stratégie
    const strategy = this.getPaymentStrategy(method);
    
    console.log(`💳 Utilisation de la stratégie: ${strategy.getPaymentMethodName()}`);

    // 🎯 POLYMORPHISME: Validation avec la stratégie choisie
    // Chaque stratégie a ses propres règles de validation
    const isValid = strategy.validatePaymentInfo(paymentDetails);
    
    if (!isValid) {
      throw new BadRequestException('Informations de paiement invalides');
    }

    // 🎯 POLYMORPHISME: Traitement avec la stratégie choisie
    // L'algorithme de paiement diffère selon la stratégie
    const result = await strategy.processPayment(order.total, paymentDetails);

    if (!result.success) {
      // Créer l'enregistrement du paiement échoué
      const failedPayment = this.paymentRepository.create({
        orderId: order.id,
        method,
        status: PaymentStatus.FAILED,
        amount: order.total,
        detailsJson: { error: result.message },
      });

      await this.paymentRepository.save(failedPayment);
      throw new BadRequestException(result.message);
    }

    // Créer l'enregistrement du paiement réussi
    const payment = this.paymentRepository.create({
      orderId: order.id,
      method,
      status: PaymentStatus.COMPLETED,
      amount: order.total,
      transactionRef: result.transactionRef,
      paidAt: result.timestamp,
      detailsJson: paymentDetails,
    });

    await this.paymentRepository.save(payment);

    // 🎯 POLYMORPHISME: Génération du reçu avec la stratégie
    // Chaque stratégie peut formater le reçu différemment
    const receipt = strategy.generateReceipt({
      amount: order.total,
      transactionRef: result.transactionRef,
      timestamp: result.timestamp,
      ...paymentDetails,
    });

    console.log('📄 Reçu généré:');
    console.log(receipt);

    return payment;
  }

  /**
   * Récupère un paiement par ID de commande
   */
  async findByOrderId(orderId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { orderId },
      relations: ['order'],
    });

    if (!payment) {
      throw new NotFoundException('Paiement introuvable');
    }

    return payment;
  }

  /**
   * Liste toutes les méthodes de paiement disponibles
   * Démontre l'extensibilité du pattern Strategy
   */
  getAvailablePaymentMethods(): Array<{
    method: PaymentMethod;
    name: string;
  }> {
    const methods: Array<{ method: PaymentMethod; name: string }> = [];

    this.strategies.forEach((strategy, method) => {
      methods.push({
        method,
        name: strategy.getPaymentMethodName(),
      });
    });

    return methods;
  }
}
