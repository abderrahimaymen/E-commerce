import { IsNotEmpty, IsEnum, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../../../domain/enums';

export class ProcessPaymentDto {
  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  cardInfo?: {
    cardNumber: string;
    cardHolderName: string;
    expiryDate: string;
    cvv: string;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  paypalInfo?: {
    email: string;
  };
}
