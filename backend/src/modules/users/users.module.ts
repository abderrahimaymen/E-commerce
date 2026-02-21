import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Client } from './entities/client.entity';
import { Admin } from './entities/admin.entity';
import { Order } from '../orders/entities/order.entity';
import { UsersAdminController } from './controllers/users-admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client, Admin, Order])],
  controllers: [UsersAdminController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
