import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto } from '../dto/review.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../domain/enums';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('product/:productId')
  @ApiOperation({ summary: 'Obtenir les avis d\'un produit' })
  getProductReviews(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.reviewsService.getProductReviews(productId);
  }

  @Post('product/:productId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Laisser un avis (achat requis)' })
  createReview(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Body() dto: CreateReviewDto,
    @Req() req,
  ) {
    return this.reviewsService.createReview(req.user.id, productId, dto);
  }

  @Patch(':reviewId/vote')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Voter utile/pas utile' })
  voteHelpful(
    @Param('reviewId', ParseUUIDPipe) reviewId: string,
    @Body('helpful') helpful: boolean,
    @Req() req,
  ) {
    return this.reviewsService.voteHelpful(reviewId, req.user.id, helpful);
  }

  // ─── Admin ──────────────────────────────────────────────────────────────────

  @Get('admin/pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Avis en attente de modération' })
  getPendingReviews() {
    return this.reviewsService.getPendingReviews();
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Tous les avis' })
  getAllReviews() {
    return this.reviewsService.getAllReviews();
  }

  @Patch('admin/:reviewId/moderate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Approuver ou rejeter un avis' })
  moderateReview(
    @Param('reviewId', ParseUUIDPipe) reviewId: string,
    @Body('action') action: 'approve' | 'reject',
  ) {
    return this.reviewsService.moderateReview(reviewId, action);
  }
}
