import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishlistItem } from '../entities/wishlist-item.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistItem)
    private wishlistRepo: Repository<WishlistItem>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async getWishlist(userId: string): Promise<WishlistItem[]> {
    const items = await this.wishlistRepo.find({
      where: { userId },
      relations: ['product'],
      order: { addedAt: 'DESC' },
    });

    // Marquer les articles avec baisse de prix
    return items.map((item) => {
      const currentPrice = item.product ? Number((item.product as any).price) : 0;
      (item as any).hasPriceDrop = currentPrice < Number(item.priceAtAddition);
      return item;
    });
  }

  async addToWishlist(userId: string, productId: string): Promise<WishlistItem> {
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Produit introuvable');

    const existing = await this.wishlistRepo.findOne({
      where: { userId, productId },
    });
    if (existing) throw new ConflictException('Produit déjà dans la wishlist');

    const item = this.wishlistRepo.create({
      userId,
      productId,
      priceAtAddition: (product as any).price ?? 0,
    });

    return this.wishlistRepo.save(item);
  }

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    const item = await this.wishlistRepo.findOne({ where: { userId, productId } });
    if (!item) throw new NotFoundException('Article introuvable dans la wishlist');
    await this.wishlistRepo.remove(item);
  }

  async clearWishlist(userId: string): Promise<void> {
    await this.wishlistRepo.delete({ userId });
  }

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const item = await this.wishlistRepo.findOne({ where: { userId, productId } });
    return !!item;
  }

  async getWishlistCount(userId: string): Promise<number> {
    return this.wishlistRepo.count({ where: { userId } });
  }
}
