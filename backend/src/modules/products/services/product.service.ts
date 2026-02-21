import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Stock } from '../entities/stock.entity';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}

/**
 * 🎯 ENCAPSULATION: Service utilisant les méthodes encapsulées de Product
 */

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    
    // 🎯 ENCAPSULATION: Utilisation des setters avec validation
    product.setName(createProductDto.name);
    product.setPrice(createProductDto.price);
    product.setDescription(createProductDto.description || '');
    product.setImage(createProductDto.image || '');
    product.setCategory(createProductDto.category || '');

    const savedProduct = await this.productRepository.save(product);

    // Créer le stock associé
    const stock = new Stock();
    stock.productId = savedProduct.id;
    stock.setQuantity(createProductDto.initialStock || 0);
    stock.setLowThreshold(10);

    await this.stockRepository.save(stock);

    return this.findOne(savedProduct.id);
  }

  async findAll(page: number = 1, limit: number = 10, filters: ProductFilters = {}) {
    const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(String(limit), 10) || 10));

    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.stock', 'stock')
      .where('product.is_active = :active', { active: true });

    if (filters.search) {
      qb.andWhere('product.name LIKE :search', { search: `%${filters.search}%` });
    }
    if (filters.category) {
      qb.andWhere('product.category = :category', { category: filters.category });
    }
    if (filters.minPrice !== undefined && !isNaN(Number(filters.minPrice))) {
      qb.andWhere('product.price >= :minPrice', { minPrice: Number(filters.minPrice) });
    }
    if (filters.maxPrice !== undefined && !isNaN(Number(filters.maxPrice))) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice: Number(filters.maxPrice) });
    }

    switch (filters.sortBy) {
      case 'price_asc':
        qb.orderBy('product.price', 'ASC');
        break;
      case 'price_desc':
        qb.orderBy('product.price', 'DESC');
        break;
      case 'name':
        qb.orderBy('product.name', 'ASC');
        break;
      default:
        qb.orderBy('product.createdAt', 'DESC');
    }

    const [products, total] = await qb
      .skip((pageNum - 1) * limitNum)
      .take(limitNum)
      .getManyAndCount();

    return {
      products: products.map(p => p.toPublicJSON()),
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    };
  }

  async findAllAdmin(page: number = 1, limit: number = 20) {
    const [products, total] = await this.productRepository.findAndCount({
      relations: ['stock'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return {
      products: products.map(p => p.toPublicJSON()),
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    };
  }

  async getCategories(): Promise<string[]> {
    const results = await this.productRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .where('product.category IS NOT NULL')
      .andWhere('product.category != :empty', { empty: '' })
      .getRawMany();
    return results.map(r => r.category).filter(Boolean);
  }

  async exportToCsv(): Promise<string> {
    const products = await this.productRepository.find({ relations: ['stock'] });
    const rows = products.map(p => {
      const pub = p.toPublicJSON();
      return [pub.id, pub.name, pub.price, pub.category, pub.description, pub.stockQuantity ?? 0]
        .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',');
    });
    const header = '"id","name","price","category","description","stock"';
    return [header, ...rows].join('\n');
  }

  async importFromCsv(csvContent: string): Promise<{ created: number; errors: string[] }> {
    const lines = csvContent.split('\n').filter(l => l.trim());
    const errors: string[] = [];
    let created = 0;

    // Skip header
    for (let i = 1; i < lines.length; i++) {
      try {
        const cols = lines[i].split(',').map(c => c.replace(/^"|"$/g, '').trim());
        const [, name, priceStr, category, description, stockStr] = cols;
        if (!name || !priceStr) {
          errors.push(`Ligne ${i + 1}: nom ou prix manquant`);
          continue;
        }
        const dto: CreateProductDto = {
          name,
          price: parseFloat(priceStr),
          category: category || '',
          description: description || '',
          initialStock: parseInt(stockStr) || 0,
        };
        await this.create(dto);
        created++;
      } catch (err) {
        errors.push(`Ligne ${i + 1}: ${err.message}`);
      }
    }
    return { created, errors };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['stock'],
    });

    if (!product) {
      throw new NotFoundException('Produit introuvable');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    // 🎯 ENCAPSULATION: Utilisation des setters avec validation
    if (updateProductDto.name !== undefined) {
      product.setName(updateProductDto.name);
    }
    if (updateProductDto.price !== undefined) {
      product.setPrice(updateProductDto.price);
    }
    if (updateProductDto.description !== undefined) {
      product.setDescription(updateProductDto.description);
    }
    if (updateProductDto.image !== undefined) {
      product.setImage(updateProductDto.image);
    }
    if (updateProductDto.category !== undefined) {
      product.setCategory(updateProductDto.category);
    }

    return this.productRepository.save(product);
  }

  async updateStock(id: string, delta: number): Promise<Product> {
    const product = await this.findOne(id);

    if (!product.stock) {
      throw new BadRequestException('Stock non initialisé');
    }

    if (delta > 0) {
      product.stock.increaseStock(delta);
    } else if (delta < 0) {
      product.stock.decreaseStock(Math.abs(delta));
    }

    await this.stockRepository.save(product.stock);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    // Soft delete
    product.deactivate();
    await this.productRepository.save(product);
  }
}
