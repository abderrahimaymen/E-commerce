import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from '../services/cart.service';
import { AddToCartDto, UpdateCartItemDto } from '../dto/cart.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir son panier' })
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Ajouter un produit au panier' })
  addItem(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addItem(
      req.user.id,
      addToCartDto.productId,
      addToCartDto.quantity,
    );
  }

  @Put('items/:productId')
  @ApiOperation({ summary: 'Modifier la quantité d\'un produit' })
  updateItem(
    @Request() req,
    @Param('productId') productId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItemQuantity(
      req.user.id,
      productId,
      updateCartItemDto.quantity,
    );
  }

  @Delete('items/:productId')
  @ApiOperation({ summary: 'Retirer un produit du panier' })
  removeItem(@Request() req, @Param('productId') productId: string) {
    return this.cartService.removeItem(req.user.id, productId);
  }

  @Post('clear')
  @ApiOperation({ summary: 'Vider le panier' })
  clear(@Request() req) {
    return this.cartService.clear(req.user.id);
  }
}
