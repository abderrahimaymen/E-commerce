import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Cart } from '../../carts/entities/cart.entity';
import { Stock } from '../../products/entities/stock.entity';
import { Promo } from '../../promos/entities/promo.entity';
import { OrderStatus } from '../../../domain/enums';

/**
 * 🎯 TRANSACTIONS: Service de gestion des commandes
 * 
 * Ce service démontre l'utilisation des transactions pour garantir
 * l'intégrité des données lors d'opérations complexes.
 */

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    @InjectRepository(Promo)
    private promoRepository: Repository<Promo>,
    private dataSource: DataSource,
  ) {}

  /**
   * 🎯 TRANSACTION: Création de commande atomique
   * 
   * Cette méthode illustre une transaction complète TypeORM:
   * 1. Charger le panier et ses items
   * 2. Vérifier le stock pour chaque produit
   * 3. Appliquer la promo si fournie
   * 4. Créer la commande et ses items
   * 5. Décrémenter le stock
   * 6. Vider le panier
   * 
   * Tout est fait dans UNE transaction: si une étape échoue, tout est annulé (ROLLBACK)
   */
  async createOrder(userId: string, promoCode?: string): Promise<Order> {
    // Créer un QueryRunner pour gérer la transaction manuellement
    const queryRunner = this.dataSource.createQueryRunner();
    
    // Connecter et démarrer la transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1️⃣ Charger le panier avec les items
      const cart = await queryRunner.manager.findOne(Cart, {
        where: { userId },
        relations: ['items', 'items.product', 'items.product.stock'],
      });

      if (!cart || cart.isEmpty()) {
        throw new BadRequestException('Le panier est vide');
      }

      // 2️⃣ Vérifier le stock pour chaque produit
      for (const item of cart.items) {
        const stock = await queryRunner.manager.findOne(Stock, {
          where: { productId: item.productId },
        });

        if (!stock || !stock.hasEnoughStock(item.quantity)) {
          throw new BadRequestException(
            `Stock insuffisant pour le produit ${item.product.getName()}`,
          );
        }
      }

      // 3️⃣ Calculer le sous-total
      const subtotal = cart.calculateTotal();

      // 4️⃣ Appliquer la promo si fournie
      let discountAmount = 0;
      let promo: Promo | null = null;

      if (promoCode) {
        promo = await queryRunner.manager.findOne(Promo, {
          where: { code: promoCode },
        });

        if (!promo) {
          throw new BadRequestException('Code promo invalide');
        }

        if (!promo.isValid()) {
          throw new BadRequestException('Code promo expiré ou utilisé au maximum');
        }

        discountAmount = promo.calculateDiscount(subtotal);
        promo.use();
        await queryRunner.manager.save(promo);
      }

      // 5️⃣ Calculer le total final
      const total = subtotal - discountAmount;

      // 6️⃣ Créer la commande
      const order = queryRunner.manager.create(Order, {
        userId,
        status: OrderStatus.EN_ATTENTE,
        subtotal,
        discountAmount,
        total,
        promoCode: promoCode || null,
      });

      await queryRunner.manager.save(order);

      // 7️⃣ Créer les items de commande avec snapshots de prix
      const orderItems: OrderItem[] = [];

      for (const cartItem of cart.items) {
        const orderItem = queryRunner.manager.create(OrderItem, {
          orderId: order.id,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          unitPriceSnapshot: cartItem.unitPriceSnapshot,
          lineTotal: cartItem.getLineTotal(),
        });

        orderItems.push(orderItem);
        await queryRunner.manager.save(orderItem);

        // 8️⃣ Décrémenter le stock
        const stock = await queryRunner.manager.findOne(Stock, {
          where: { productId: cartItem.productId },
        });

        stock.decreaseStock(cartItem.quantity);
        await queryRunner.manager.save(stock);
      }

      // 9️⃣ Vider le panier
      cart.clear();
      await queryRunner.manager.save(cart);

      // ✅ Committer la transaction
      await queryRunner.commitTransaction();

      // Charger la commande complète avec relations
      return this.orderRepository.findOne({
        where: { id: order.id },
        relations: ['items', 'items.product'],
      });
    } catch (error) {
      // ❌ Annuler la transaction en cas d'erreur (ROLLBACK)
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Libérer le QueryRunner
      await queryRunner.release();
    }
  }

  async findAll(userId?: string): Promise<Order[]> {
    const where = userId ? { userId } : {};
    return this.orderRepository.find({
      where,
      relations: ['items', 'items.product', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllAdmin(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['items', 'items.product', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId?: string): Promise<Order> {
    const where: any = { id };
    if (userId) {
      where.userId = userId;
    }

    const order = await this.orderRepository.findOne({
      where,
      relations: ['items', 'items.product', 'payment', 'delivery'],
    });

    if (!order) {
      throw new NotFoundException('Commande introuvable');
    }

    return order;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return this.orderRepository.save(order);
  }

  async cancelOrder(id: string, userId: string): Promise<Order> {
    const order = await this.findOne(id, userId);
    order.cancel();
    return this.orderRepository.save(order);
  }
}
