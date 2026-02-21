import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Order } from '../../orders/entities/order.entity';
import { CreateReviewDto } from '../dto/review.dto';
import { ReviewStatus, OrderStatus } from '../../../domain/enums';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  /**
   * Créer un avis — seulement si l'utilisateur a acheté le produit
   */
  async createReview(
    userId: string,
    productId: string,
    dto: CreateReviewDto,
  ): Promise<Review> {
    // Vérifier que l'utilisateur a acheté le produit
    const hasPurchased = await this.orderRepo
      .createQueryBuilder('order')
      .innerJoin('order.items', 'item')
      .where('order.userId = :userId', { userId })
      .andWhere('item.productId = :productId', { productId })
      .andWhere('order.status = :status', { status: OrderStatus.LIVREE })
      .getOne();

    if (!hasPurchased) {
      throw new ForbiddenException(
        'Vous devez avoir acheté ce produit pour laisser un avis',
      );
    }

    // Vérifier si déjà un avis
    const existing = await this.reviewRepo.findOne({
      where: { userId, productId },
    });
    if (existing) {
      throw new BadRequestException('Vous avez déjà laissé un avis pour ce produit');
    }

    const review = this.reviewRepo.create({
      userId,
      productId,
      ...dto,
      status: ReviewStatus.PENDING,
    });

    return this.reviewRepo.save(review);
  }

  /**
   * Obtenir les avis approuvés d'un produit
   */
  async getProductReviews(productId: string): Promise<{
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
    ratingBreakdown: Record<number, number>;
  }> {
    const reviews = await this.reviewRepo.find({
      where: { productId, status: ReviewStatus.APPROVED },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    const ratingBreakdown: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((r) => {
      ratingBreakdown[r.rating] = (ratingBreakdown[r.rating] || 0) + 1;
    });

    return {
      reviews,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      ratingBreakdown,
    };
  }

  /**
   * Voter utile/pas utile
   */
  async voteHelpful(
    reviewId: string,
    userId: string,
    helpful: boolean,
  ): Promise<Review> {
    const review = await this.reviewRepo.findOne({ where: { id: reviewId } });
    if (!review) throw new NotFoundException('Avis introuvable');

    if (!review.helpfulVoters) review.helpfulVoters = [];

    if (review.helpfulVoters.includes(userId)) {
      throw new BadRequestException('Vous avez déjà voté pour cet avis');
    }

    review.helpfulVoters.push(userId);
    if (helpful) {
      review.helpfulVotes++;
    } else {
      review.notHelpfulVotes++;
    }

    return this.reviewRepo.save(review);
  }

  // ─── Admin Methods ─────────────────────────────────────────────────────────

  async getPendingReviews(): Promise<Review[]> {
    return this.reviewRepo.find({
      where: { status: ReviewStatus.PENDING },
      relations: ['user', 'product'],
      order: { createdAt: 'ASC' },
    });
  }

  async moderateReview(
    reviewId: string,
    action: 'approve' | 'reject',
  ): Promise<Review> {
    const review = await this.reviewRepo.findOne({ where: { id: reviewId } });
    if (!review) throw new NotFoundException('Avis introuvable');

    review.status =
      action === 'approve' ? ReviewStatus.APPROVED : ReviewStatus.REJECTED;
    return this.reviewRepo.save(review);
  }

  async getAllReviews(): Promise<Review[]> {
    return this.reviewRepo.find({
      relations: ['user', 'product'],
      order: { createdAt: 'DESC' },
    });
  }
}
