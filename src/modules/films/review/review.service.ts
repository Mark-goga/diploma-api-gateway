import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FindManyDtoValidator } from '@common/dto/find-mant-documents.dto';
import { firstValueFrom } from 'rxjs';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  REVIEW_PACKAGE_NAME,
  REVIEW_SERVICE_NAME,
  ReviewServiceClient,
} from '@proto/review/review';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class ReviewService implements OnModuleInit {
  private reviewService: ReviewServiceClient;

  constructor(@Inject(REVIEW_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.reviewService =
      this.client.getService<ReviewServiceClient>(REVIEW_SERVICE_NAME);
  }

  async create(createReviewDto: CreateReviewDto, metadata: Metadata) {
    return await firstValueFrom(
      this.reviewService.createReview(createReviewDto, metadata),
    );
  }

  async findAll(options: FindManyDtoValidator, metadata: Metadata) {
    return await firstValueFrom(
      this.reviewService.findManyReviews(
        {
          ...options,
        },
        metadata,
      ),
    );
  }

  async findOne(id: string, metadata: Metadata) {
    return await firstValueFrom(
      this.reviewService.findOneReview(
        {
          id,
        },
        metadata,
      ),
    );
  }

  async findByFilm(filmId: string, metadata: Metadata) {
    return await firstValueFrom(
      this.reviewService.findReviewsByFilm(
        {
          filmId,
        },
        metadata,
      ),
    );
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto,
    metadata: Metadata,
  ) {
    return await firstValueFrom(
      this.reviewService.updateReview(
        {
          ...updateReviewDto,
          id,
        } as any,
        metadata,
      ),
    );
  }

  async remove(id: string, metadata: Metadata) {
    return await firstValueFrom(
      this.reviewService.removeReview(
        {
          id,
        },
        metadata,
      ),
    );
  }
}
