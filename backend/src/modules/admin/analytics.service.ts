import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { User } from '../../domain/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Review } from '../reviews/entities/review.entity';
import { OrderStatus } from '../../domain/enums';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
  ) {}

  /**
   * 📊 Vue d'ensemble — KPI dashboard
   */
  async getOverview(period: 'today' | 'week' | 'month' | 'year' = 'month') {
    const { start, prevStart, prevEnd } = this.getPeriodDates(period);
    const now = new Date();

    // Revenus période actuelle
    const currentOrders = await this.orderRepo.find({
      where: {
        createdAt: Between(start, now),
        status: OrderStatus.LIVREE,
      },
    });
    const currentRevenue = currentOrders.reduce(
      (sum, o) => sum + Number(o.total || 0),
      0,
    );

    // Revenus période précédente
    const prevOrders = await this.orderRepo.find({
      where: {
        createdAt: Between(prevStart, prevEnd),
        status: OrderStatus.LIVREE,
      },
    });
    const prevRevenue = prevOrders.reduce(
      (sum, o) => sum + Number(o.total || 0),
      0,
    );

    // Nouveaux utilisateurs
    const currentUsers = await this.userRepo.count({
      where: { createdAt: Between(start, now) },
    });
    const prevUsers = await this.userRepo.count({
      where: { createdAt: Between(prevStart, prevEnd) },
    });

    // Commandes
    const currentOrderCount = await this.orderRepo.count({
      where: { createdAt: Between(start, now) },
    });
    const prevOrderCount = await this.orderRepo.count({
      where: { createdAt: Between(prevStart, prevEnd) },
    });

    return {
      revenue: {
        current: Math.round(currentRevenue * 100) / 100,
        previous: Math.round(prevRevenue * 100) / 100,
        change: this.percentChange(currentRevenue, prevRevenue),
      },
      orders: {
        current: currentOrderCount,
        previous: prevOrderCount,
        change: this.percentChange(currentOrderCount, prevOrderCount),
      },
      newUsers: {
        current: currentUsers,
        previous: prevUsers,
        change: this.percentChange(currentUsers, prevUsers),
      },
      totalProducts: await this.productRepo.count(),
      pendingReviews: await this.reviewRepo.count({ where: { status: 'PENDING' as any } }),
    };
  }

  /**
   * 📈 Graphique des revenus (30 derniers jours)
   */
  async getRevenueChart(days = 30): Promise<{ date: string; revenue: number; orders: number }[]> {
    const result: { date: string; revenue: number; orders: number }[] = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(now.getDate() - i);
      const dayStart = new Date(day.setHours(0, 0, 0, 0));
      const dayEnd = new Date(new Date(dayStart).setHours(23, 59, 59, 999));

      const dayOrders = await this.orderRepo.find({
        where: { createdAt: Between(dayStart, dayEnd) },
      });

      const revenue = dayOrders
        .filter((o) => o.status === OrderStatus.LIVREE || o.status === OrderStatus.EXPEDIEE)
        .reduce((sum, o) => sum + Number(o.total || 0), 0);

      result.push({
        date: dayStart.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        revenue: Math.round(revenue * 100) / 100,
        orders: dayOrders.length,
      });
    }
    return result;
  }

  /**
   * 🏆 Top produits vendus
   */
  async getTopProducts(limit = 10) {
    const result = await this.orderRepo
      .createQueryBuilder('order')
      .innerJoin('order.items', 'item')
      .select('item.productId', 'productId')
      .addSelect('SUM(item.quantity)', 'totalSold')
      .addSelect('SUM(item.subtotal)', 'totalRevenue')
      .groupBy('item.productId')
      .orderBy('totalSold', 'DESC')
      .limit(limit)
      .getRawMany();

    // Enrichir avec les noms des produits
    const enriched = await Promise.all(
      result.map(async (row) => {
        const product = await this.productRepo.findOne({
          where: { id: row.productId },
        });
        return {
          productId: row.productId,
          name: product ? (product as any).name || (product as any).getName?.() : 'Inconnu',
          totalSold: Number(row.totalSold),
          totalRevenue: Math.round(Number(row.totalRevenue) * 100) / 100,
        };
      }),
    );
    return enriched;
  }

  /**
   * ⚠️ Alertes stock bas
   */
  async getLowStockAlerts(threshold = 10) {
    const products = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.stock', 'stock')
      .where('product.isActive = :active', { active: true })
      .getMany();

    return products
      .filter((p) => {
        const qty = (p as any).quantity ?? (p.stock as any)?.quantity ?? 0;
        return qty <= threshold;
      })
      .map((p) => ({
        id: p.id,
        name: (p as any).name || (p as any).getName?.(),
        quantity: (p as any).quantity ?? 0,
        threshold,
      }));
  }

  /**
   * 📊 Répartition par statut de commande
   */
  async getOrderStatusBreakdown() {
    const statuses = Object.values(OrderStatus);
    const breakdown = await Promise.all(
      statuses.map(async (status) => ({
        status,
        count: await this.orderRepo.count({ where: { status } }),
      })),
    );
    return breakdown;
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private getPeriodDates(period: string) {
    const now = new Date();
    let start: Date;
    let prevStart: Date;
    let prevEnd: Date;

    switch (period) {
      case 'today':
        start = new Date(now.setHours(0, 0, 0, 0));
        prevStart = new Date(new Date().setDate(new Date().getDate() - 1));
        prevStart.setHours(0, 0, 0, 0);
        prevEnd = new Date(prevStart);
        prevEnd.setHours(23, 59, 59, 999);
        break;
      case 'week':
        start = new Date(now.setDate(now.getDate() - 7));
        prevStart = new Date(new Date().setDate(new Date().getDate() - 14));
        prevEnd = new Date(new Date().setDate(new Date().getDate() - 7));
        break;
      case 'year':
        start = new Date(now.getFullYear(), 0, 1);
        prevStart = new Date(now.getFullYear() - 1, 0, 1);
        prevEnd = new Date(now.getFullYear() - 1, 11, 31);
        break;
      default: // month
        start = new Date(now.setDate(now.getDate() - 30));
        prevStart = new Date(new Date().setDate(new Date().getDate() - 60));
        prevEnd = new Date(new Date().setDate(new Date().getDate() - 30));
    }

    return { start, prevStart, prevEnd };
  }

  private percentChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  }
}
