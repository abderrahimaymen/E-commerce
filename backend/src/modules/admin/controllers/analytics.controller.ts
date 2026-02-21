import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from '../analytics.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../domain/enums';

@ApiTags('Admin - Analytics')
@Controller('admin/analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  @ApiOperation({ summary: 'KPI Dashboard — revenus, commandes, utilisateurs' })
  @ApiQuery({ name: 'period', enum: ['today', 'week', 'month', 'year'], required: false })
  getOverview(@Query('period') period?: 'today' | 'week' | 'month' | 'year') {
    return this.analyticsService.getOverview(period);
  }

  @Get('revenue-chart')
  @ApiOperation({ summary: 'Graphique revenus (N derniers jours)' })
  @ApiQuery({ name: 'days', type: Number, required: false })
  getRevenueChart(@Query('days') days?: string) {
    return this.analyticsService.getRevenueChart(Number(days) || 30);
  }

  @Get('top-products')
  @ApiOperation({ summary: 'Top produits vendus' })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  getTopProducts(@Query('limit') limit?: string) {
    return this.analyticsService.getTopProducts(Number(limit) || 10);
  }

  @Get('low-stock')
  @ApiOperation({ summary: 'Alertes stock bas' })
  @ApiQuery({ name: 'threshold', type: Number, required: false })
  getLowStock(@Query('threshold') threshold?: string) {
    return this.analyticsService.getLowStockAlerts(Number(threshold) || 10);
  }

  @Get('order-status')
  @ApiOperation({ summary: 'Répartition commandes par statut' })
  getOrderStatusBreakdown() {
    return this.analyticsService.getOrderStatusBreakdown();
  }
}
