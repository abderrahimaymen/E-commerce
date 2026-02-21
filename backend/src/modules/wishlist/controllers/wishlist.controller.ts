import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { WishlistService } from '../services/wishlist.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('Wishlist')
@Controller('wishlist')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir ma wishlist' })
  getWishlist(@Req() req) {
    return this.wishlistService.getWishlist(req.user.id);
  }

  @Get('count')
  @ApiOperation({ summary: 'Nombre d\'articles dans la wishlist' })
  async getCount(@Req() req) {
    const count = await this.wishlistService.getWishlistCount(req.user.id);
    return { count };
  }

  @Get('check/:productId')
  @ApiOperation({ summary: 'Vérifier si un produit est dans la wishlist' })
  async checkItem(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Req() req,
  ) {
    const inWishlist = await this.wishlistService.isInWishlist(req.user.id, productId);
    return { inWishlist };
  }

  @Post(':productId')
  @ApiOperation({ summary: 'Ajouter un produit à la wishlist' })
  addToWishlist(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Req() req,
  ) {
    return this.wishlistService.addToWishlist(req.user.id, productId);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Retirer un produit de la wishlist' })
  removeFromWishlist(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Req() req,
  ) {
    return this.wishlistService.removeFromWishlist(req.user.id, productId);
  }

  @Delete()
  @ApiOperation({ summary: 'Vider la wishlist' })
  clearWishlist(@Req() req) {
    return this.wishlistService.clearWishlist(req.user.id);
  }
}
