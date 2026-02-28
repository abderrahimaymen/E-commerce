import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from '../src/modules/users/entities/admin.entity';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const adminRepo = app.get(getRepositoryToken(Admin));

  const existingAdmin = await adminRepo.findOne({ where: { email: 'admin@ecommerce.com' } });
  if (existingAdmin) {
    console.log('Admin already exists!');
    await app.close();
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = adminRepo.create({
    name: 'Super Admin',
    email: 'admin@ecommerce.com',
    passwordHash: hashedPassword,
    department: 'Direction',
    accessLevel: 10,
  });

  await adminRepo.save(admin);
  console.log('✅ Admin account created successfully!');
  console.log('Email: admin@ecommerce.com');
  console.log('Password: admin123');

  await app.close();
}

bootstrap();
