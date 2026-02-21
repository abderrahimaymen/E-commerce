import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'order_id' })
  orderId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'product_id' })
  productId: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'unit_price_snapshot' })
  unitPriceSnapshot: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'line_total' })
  lineTotal: number;

  public calculateLineTotal(): number {
    return Number((this.quantity * this.unitPriceSnapshot).toFixed(2));
  }
}
