import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Product } from '../../products/entities/product.entity';

/**
 * 🎯 COMPOSITION: Service utilisant la composition Cart -> CartItem
 */

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items', 'items.product', 'items.product.stock'],
    });

    if (!cart) {
      cart = this.cartRepository.create({ userId });
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addItem(userId: string, productId: string, quantity: number): Promise<Cart> {
    // Vérifier que le produit existe
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['stock'],
    });

    if (!product || !product.getIsActive()) {
      throw new NotFoundException('Produit introuvable ou inactif');
    }

    // Vérifier le stock
    if (!product.stock || product.stock.getQuantity() < quantity) {
      throw new BadRequestException('Stock insuffisant');
    }

    const cart = await this.getOrCreateCart(userId);

    // 🎯 COMPOSITION: Utilisation de la méthode du Cart
    const existingItem = cart.findItemByProductId(productId);

    if (existingItem) {
      // Produit déjà dans le panier: incrémenter
      existingItem.increaseQuantity(quantity);
      await this.cartItemRepository.save(existingItem);
    } else {
      // Nouveau produit: créer un CartItem
      const cartItem = this.cartItemRepository.create({
        cartId: cart.id,
        productId,
        quantity,
        unitPriceSnapshot: product.getPrice(),
      });
      await this.cartItemRepository.save(cartItem);
    }

    return this.getOrCreateCart(userId);
  }

  async updateItemQuantity(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    const item = cart.findItemByProductId(productId);

    if (!item) {
      throw new NotFoundException('Produit non trouvé dans le panier');
    }

    item.setQuantity(quantity);
    await this.cartItemRepository.save(item);

    return this.getOrCreateCart(userId);
  }

  async removeItem(userId: string, productId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    const item = cart.findItemByProductId(productId);

    if (!item) {
      throw new NotFoundException('Produit non trouvé dans le panier');
    }

    await this.cartItemRepository.remove(item);

    return this.getOrCreateCart(userId);
  }

  async clear(userId: string): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    if (cart.items && cart.items.length > 0) {
      await this.cartItemRepository.remove(cart.items);
    }

    return this.getOrCreateCart(userId);
  }

  async getCart(userId: string): Promise<any> {
    const cart = await this.getOrCreateCart(userId);
    return cart.getSummary();
  }
}
