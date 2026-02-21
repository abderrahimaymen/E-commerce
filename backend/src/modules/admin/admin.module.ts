import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { User } from '../../domain/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Review } from '../reviews/entities/review.entity';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './controllers/analytics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, Review])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AdminModule {}
