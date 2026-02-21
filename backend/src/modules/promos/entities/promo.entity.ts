import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { PromoType } from '../../../domain/enums';

@Entity('promos')
export class Promo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({
    type: 'enum',
    enum: PromoType,
  })
  type: PromoType;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  expiry: Date;

  @Column({ name: 'usage_limit', nullable: true })
  usageLimit: number;

  @Column({ name: 'used_count', default: 0 })
  usedCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  public isValid(): boolean {
    if (!this.active) return false;
    if (this.expiry && new Date() > this.expiry) return false;
    if (this.usageLimit && this.usedCount >= this.usageLimit) return false;
    return true;
  }

  public calculateDiscount(amount: number): number {
    if (this.type === PromoType.PERCENT) {
      return Number((amount * this.value / 100).toFixed(2));
    }
    return Number(this.value.toFixed(2));
  }

  public use(): void {
    this.usedCount++;
  }
}
