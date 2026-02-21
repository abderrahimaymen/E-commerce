import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from '../services/payment.service';
import { ProcessPaymentDto } from '../dto/payment.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PaymentMethod } from '../../../domain/enums';

@ApiTags('payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post(':orderId')
  @ApiOperation({ summary: 'Traiter un paiement pour une commande' })
  async processPayment(
    @Param('orderId') orderId: string,
    @Body() processPaymentDto: ProcessPaymentDto,
  ) {
    const paymentDetails =
      processPaymentDto.method === PaymentMethod.CARD
        ? processPaymentDto.cardInfo
        : processPaymentDto.paypalInfo;

    return this.paymentService.processPayment(
      orderId,
      processPaymentDto.method,
      paymentDetails,
    );
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Obtenir le paiement d\'une commande' })
  getPayment(@Param('orderId') orderId: string) {
    return this.paymentService.findByOrderId(orderId);
  }

  @Get('methods/available')
  @ApiOperation({ summary: 'Liste des méthodes de paiement disponibles' })
  getAvailableMethods() {
    return this.paymentService.getAvailablePaymentMethods();
  }
}
