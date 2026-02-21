import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../domain/enums';
import { EmailService } from '../../email/email.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@ApiTags('Admin - Users')
@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth()
export class UsersAdminController {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    private emailService: EmailService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les utilisateurs' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  async getAllUsers(
    @Query('search') search?: string,
    @Query('page') page: number = 1,
  ) {
    const limit = 20;
    const qb = this.userRepo.createQueryBuilder('user');

    if (search) {
      qb.where('user.name LIKE :s OR user.email LIKE :s', { s: `%${search}%` });
    }

    const [users, total] = await qb
      .select(['user.id', 'user.name', 'user.email', 'user.role', 'user.isActive', 'user.createdAt'])
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { users, total, page, totalPages: Math.ceil(total / limit) };
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'Historique commandes d\'un utilisateur' })
  async getUserOrders(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderRepo.find({
      where: { userId: id },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  @Patch(':id/block')
  @ApiOperation({ summary: 'Bloquer / débloquer un compte utilisateur' })
  async toggleBlock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('blocked') blocked: boolean,
  ) {
    await this.userRepo.update(id, { isBlocked: blocked } as any);
    return { success: true, isBlocked: blocked };
  }

  @Patch(':id/reset-password')
  @ApiOperation({ summary: 'Envoyer un reset de mot de passe par email' })
  async resetPassword(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) return { success: false };

    const token = crypto.randomBytes(32).toString('hex');
    const tempPassword = crypto.randomBytes(8).toString('hex');
    const hashed = await bcrypt.hash(tempPassword, 12);

    await this.userRepo.update(id, { passwordHash: hashed } as any);
    await this.emailService.sendPasswordReset(user.email, user.name, token);

    return { success: true, message: 'Email de réinitialisation envoyé' };
  }
}
