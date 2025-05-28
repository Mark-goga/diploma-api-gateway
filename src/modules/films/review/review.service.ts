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
import { UsersService } from '@modules/users/users.service';

@Injectable()
export class ReviewService implements OnModuleInit {
  private reviewService: ReviewServiceClient;

  constructor(
    @Inject(REVIEW_PACKAGE_NAME) private client: ClientGrpc,
    private readonly usersService: UsersService,
  ) {}

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

  async findByUser(userId: string) {
    const { reviews } = await firstValueFrom(
      this.reviewService.findReviewsByUser({
        id: userId,
      }),
    );
    const user = await this.usersService.findOne(userId);
    return {
      reviews,
      user,
    };
  }

  async getPersonalFiltersForFilms(userId: string) {
    return await firstValueFrom(
      this.reviewService.getPersonalFiltersForFilms({
        id: userId,
      }),
    );
  }
}
