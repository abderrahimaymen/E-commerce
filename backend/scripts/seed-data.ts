import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Product } from '../src/modules/products/entities/product.entity';
import { Stock } from '../src/modules/products/entities/stock.entity';
import { Client } from '../src/modules/users/entities/client.entity';
import { UserRole } from '../src/domain/enums';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const productRepo = app.get(getRepositoryToken(Product));
  const stockRepo = app.get(getRepositoryToken(Stock));
  const clientRepo = app.get(getRepositoryToken(Client));

  console.log('🌱 Seeding database...');

  // 1. Create Products
  const productsData = [
    {
      name: 'Smartphone X',
      description: 'Latest model with high-res camera',
      price: 999.99,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff75?auto=format&fit=crop&q=80&w=800',
      category: 'Electronics',
      stock: 50
    },
    {
      name: 'Laptop Pro 15',
      description: 'Powerful laptop for professionals',
      price: 1499.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
      category: 'Electronics',
      stock: 20
    },
    {
      name: 'Wireless Headphones',
      description: 'Noise cancelling headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      category: 'Audio',
      stock: 100
    },
    {
      name: 'Smart Watch 4',
      description: 'Track your fitness and notifications',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      category: 'Wearables',
      stock: 30
    },
    {
      name: 'Gaming Console',
      description: 'Next-gen gaming experience',
      price: 499.99,
      image: 'https://images.unsplash.com/photo-1481486940027-2c9f1d0441d8?auto=format&fit=crop&q=80&w=800',
      category: 'Gaming',
      stock: 15
    },
    {
      name: '4K Smart TV',
      description: 'Ultra HD television with smart features',
      price: 799.99,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800',
      category: 'Electronics',
      stock: 10
    }
  ];

  for (const pData of productsData) {
    try {
      // Check if product exists (by name for simplicity)
      // Since 'name' is private and encapsulated, we can't query by it directly unless we use query builder or assume it's mapped to 'name' column
      const existing = await productRepo.createQueryBuilder('product')
        .where('product.name = :name', { name: pData.name })
        .getOne();

      if (!existing) {
        const product = new Product();
        product.setName(pData.name);
        product.setPrice(pData.price);
        // Accessing private fields via direct assignment is possible within the module but here we need to use what's available or cast to any if no setter
        // Based on product.entity.ts, description, image, category don't have setters shown in the snippet, but they might exist or I can cast.
        // Assuming validation is strict, let's look at the entity again. It had public getters but only setName/setPrice visible in snippet.
        // I will use direct assignment with 'any' cast to bypass private modifier for seeding script if setters are missing.
        (product as any).description = pData.description;
        (product as any).image = pData.image;
        (product as any).category = pData.category;
        (product as any).isActive = true;

        const savedProduct = await productRepo.save(product);

        // Create Stock
        const stock = new Stock();
        stock.product = savedProduct;
        stock.setQuantity(pData.stock);
        stock.setLowThreshold(5);
        
        await stockRepo.save(stock);
        console.log(`✅ Created product: ${pData.name}`);
      } else {
        console.log(`ℹ️ Product ${pData.name} already exists`);
      }
    } catch (error: any) {
      console.error(`❌ Failed to create product ${pData.name}:`, error.message);
    }
  }

  // 2. Create Clients
  const clientsData = [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'password123',
      role: UserRole.CLIENT
    },
    {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      password: 'password123',
      role: UserRole.CLIENT
    }
  ];

  for (const cData of clientsData) {
    try {
      const existing = await clientRepo.findOne({ where: { email: cData.email } });
      if (!existing) {
        const hashedPassword = await bcrypt.hash(cData.password, 10);
        
        const client = clientRepo.create({
          email: cData.email,
          name: cData.name,
          passwordHash: hashedPassword,
          role: cData.role,
          loyaltyPoints: 0
        });

        await clientRepo.save(client);
        console.log(`✅ Created client: ${cData.email}`);
      } else {
        console.log(`ℹ️ Client ${cData.email} already exists`);
      }
    } catch (error: any) {
      console.error(`❌ Failed to create client ${cData.email}:`, error.message);
    }
  }

  console.log('🎉 Seeding complete!');
  await app.close();
}

bootstrap();
