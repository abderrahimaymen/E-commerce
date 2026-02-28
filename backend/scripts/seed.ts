import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../src/modules/products/entities/product.entity';
import { Stock } from '../src/modules/products/entities/stock.entity';
import { Client } from '../src/modules/users/entities/client.entity';
import { Admin } from '../src/modules/users/entities/admin.entity';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

/**
 * ==============================================================================
 * 🌱 SEED SCRIPT (Scripts de Peuplement)
 * ==============================================================================
 * 
 * WHY: This script is separate from the main application logic to allow
 * populating the database with test data on demand. It is essential for:
 * 1. Testing: Providing a consistent data set for manual and automated tests.
 * 2. Development: Allowing developers to work on features without manually entering data.
 * 
 * TECHNOLOGY: uses NestJS Application Context to leverage the existing
 * Dependency Injection system (Repositories, Database Config) without
 * starting the actual HTTP server.
 */

async function bootstrap() {
  console.log('🌱 Starting Database Seeding...');

  // 1. INITIALIZATION
  // WHY: We create an ApplicationContext (not a full app) to access repositories.
  // usage of the existing AppModule ensures we use the same DB config.
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // 2. DEPENDENCY INJECTION
    // WHY: We use `app.get()` to retrieve the Repositories managed by TypeORM.
    // This abstracts the database connection details.
    const productRepo = app.get(getRepositoryToken(Product));
    const stockRepo = app.get(getRepositoryToken(Stock));
    const clientRepo = app.get(getRepositoryToken(Client));
    const adminRepo = app.get(getRepositoryToken(Admin));

    // 3. CLEANUP (Optional)
    // WHY: Clearing old data ensures tests run on a predictable "clean slate".
    // For now, we only seed if the database is empty to avoid duplicates.
    const productCount = await productRepo.count();
    
    if (productCount > 0) {
      console.log('⚠️  Database already has products. Skipping product seeding.');
    } else {
      console.log('🧹 database appears empty. Seeding products...');
      await seedProducts(productRepo, stockRepo);
    }

    const clientCount = await clientRepo.count();
    if (clientCount > 0) {
      console.log('⚠️  Database already has clients. Skipping client seeding.');
    } else {
      console.log('🧹 Seeding clients...');
      await seedClients(clientRepo);
    }
    
    console.log('✅ Seeding complete!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    // 4. RESOURCE MANAGEMENT
    // WHY: Always close the application context to close database connections
    // and release resources, otherwise the script might hang.
    await app.close();
  }
}

async function seedProducts(productRepo: Repository<Product>, stockRepo: Repository<Stock>) {
  const categories = ['Electronics', 'Clothing', 'Home', 'Books'];
  const data = [
    {
      name: 'Wireless Headphones',
      price: 129.99,
      description: 'High-quality noise-canceling wireless headphones with 20h battery life.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      stock: 50
    },
    {
      name: 'Smartphone Pro Max',
      price: 999.00,
      description: 'Latest generation smartphone with triple camera system and OLED display.',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
      stock: 15
    },
    {
      name: 'Cotton T-Shirt',
      price: 24.99,
      description: '100% organic cotton t-shirt, breathable and comfortable.',
      category: 'Clothing',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
      stock: 100
    },
    {
      name: 'Denim Jeans',
      price: 59.50,
      description: 'Classic fit denim jeans with durable stitching.',
      category: 'Clothing',
      image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=500&q=80',
      stock: 45
    },
    {
      name: 'Coffee Maker',
      price: 89.99,
      description: 'Programmable coffee maker with thermal carafe.',
      category: 'Home',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80',
      stock: 20
    },
    {
      name: 'Python Programming Guide',
      price: 45.00,
      description: 'Comprehensive guide to Python programming for beginners to experts.',
      category: 'Books',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80',
      stock: 30
    },
    {
        name: 'Gaming Mouse',
        price: 49.99,
        description: 'Ergonomic gaming mouse with various DPI settings.',
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
        stock: 0 // Out of stock
    }
  ];

  for (const item of data) {
    // 5. ENCAPSULATION IN ACTION
    // WHY: We instantiate the entity and use PUBLIC SETTERS instead of directly
    // assigning properties (e.g., product.price = ... is not creating the object correctly).
    // This respects the private fields and validation logic defined in the Entity.
    
    // Create new Product instance
    const product = new Product();
    
    // Apply values via setters (validates inputs)
    product.setName(item.name);
    product.setPrice(item.price);
    product.setDescription(item.description);
    product.setCategory(item.category);
    product.setImage(item.image);
    product.setIsActive(true);

    // Save product first to generate ID
    const savedProduct = await productRepo.save(product);

    // Create associated Stock
    const stock = new Stock();
    stock.setQuantity(item.stock);
    stock.setLowThreshold(5);
    stock.product = savedProduct; // Link relation

    // Save stock
    await stockRepo.save(stock);
    
    console.log(`   + Created product: ${item.name}`);
  }
}

async function seedClients(clientRepo: Repository<Client>) {
  // 6. PASSWORD HASHING
  // WHY: Passwords must NEVER be stored in plain text. We use bcrypt to hash them
  // before saving, simulating a real registration process.
  const hashedPassword = await bcrypt.hash('client123', 10);

  const client = clientRepo.create({
    email: 'client@example.com',
    passwordHash: hashedPassword,
    name: 'John Doe',
    // isActive: true, // Removed because it's not in the Client entity/DTO directly or might be protected
    loyaltyPoints: 100,
    phoneNumber: '1234567890'
  });

  await clientRepo.save(client);
  console.log('   + Created client: client@example.com / client123');
}

// Execute the bootstrap function
bootstrap();
