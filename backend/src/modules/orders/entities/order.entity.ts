import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { OrderStatus } from '../../../domain/enums';
import { OrderItem } from './order-item.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Delivery } from '../../deliveries/entities/delivery.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.EN_ATTENTE,
  })
  status: OrderStatus;

  /**
   * Items de la commande - Composition
   */
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, eager: true })
  items: OrderItem[];

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'discount_amount', default: 0 })
  discountAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ name: 'promo_code', nullable: true })
  promoCode: string;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  @OneToOne(() => Delivery, (delivery) => delivery.order)
  delivery: Delivery;

  @OneToOne(() => Invoice, (invoice) => invoice.order)
  invoice: Invoice;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Méthodes métier
  public canBeCancelled(): boolean {
    return [OrderStatus.EN_ATTENTE, OrderStatus.PAYEE].includes(this.status);
  }

  public cancel(): void {
    if (!this.canBeCancelled()) {
      throw new Error('Cette commande ne peut plus être annulée');
    }
    this.status = OrderStatus.ANNULEE;
  }

  public calculateTotal(): number {
    return Number((this.subtotal - this.discountAmount).toFixed(2));
  }
}
