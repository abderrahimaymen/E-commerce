import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { CreateOrderDto, UpdateOrderStatusDto } from '../dto/order.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../domain/enums';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une commande depuis le panier' })
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(req.user.id, createOrderDto.promoCode);
  }

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Toutes les commandes (Admin)' })
  findAllAdmin() {
    return this.orderService.findAllAdmin();
  }

  @Get()
  findAll(@Request() req) {
    return this.orderService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'une commande' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.orderService.findOne(id, req.user.id);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Modifier le statut d\'une commande (Admin)' })
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateOrderStatusDto) {
    return this.orderService.updateStatus(id, updateStatusDto.status);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Annuler une commande' })
  cancel(@Request() req, @Param('id') id: string) {
    return this.orderService.cancelOrder(id, req.user.id);
  }
}
