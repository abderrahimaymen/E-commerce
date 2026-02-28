import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../users/entities/admin.entity';
import * as bcrypt from 'bcryptjs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Inscription d\'un nouveau client' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Connexion utilisateur' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('setup-admin')
  @ApiOperation({ summary: 'Créer le compte admin par défaut (temporaire)' })
  async setupAdmin() {
    const existingAdmin = await this.adminRepo.findOne({ where: { email: 'admin@ecommerce.com' } });
    if (existingAdmin) {
      return { message: 'Le compte admin existe déjà', email: 'admin@ecommerce.com' };
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = this.adminRepo.create({
      name: 'Super Admin',
      email: 'admin@ecommerce.com',
      passwordHash: hashedPassword,
      department: 'Direction',
      accessLevel: 10,
    });

    await this.adminRepo.save(admin);
    return { 
      message: 'Compte admin créé avec succès !', 
      email: 'admin@ecommerce.com', 
      password: 'admin123' 
    };
  }
}
