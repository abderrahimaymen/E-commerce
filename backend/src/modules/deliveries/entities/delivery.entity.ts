import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Address } from './address.entity';
import { DeliveryStatus } from '../../../domain/enums';

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, (order) => order.delivery)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'order_id', unique: true })
  orderId: string;

  @ManyToOne(() => Address, { eager: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ name: 'address_id' })
  addressId: string;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING,
  })
  status: DeliveryStatus;

  @Column({ name: 'tracking_code', nullable: true })
  trackingCode: string;

  @Column({ type: 'timestamp', name: 'shipped_at', nullable: true })
  shippedAt: Date;

  @Column({ type: 'timestamp', name: 'delivered_at', nullable: true })
  deliveredAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  public generateTrackingCode(): string {
    const random = Math.floor(Math.random() * 1000000000);
    return `TRACK-${random}`;
  }

  public markAsShipped(): void {
    this.status = DeliveryStatus.IN_TRANSIT;
    this.shippedAt = new Date();
    if (!this.trackingCode) {
      this.trackingCode = this.generateTrackingCode();
    }
  }

  public markAsDelivered(): void {
    this.status = DeliveryStatus.DELIVERED;
    this.deliveredAt = new Date();
  }
}
