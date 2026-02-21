import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promo } from './entities/promo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promo])],
  exports: [TypeOrmModule],
})
export class PromosModule {}
