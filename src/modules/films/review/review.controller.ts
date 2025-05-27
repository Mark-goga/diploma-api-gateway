import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATION, ENDPOINTS, RESPONSE_MESSAGES } from '@common/constants';
import { TokenGuard } from '@common/guards';
import { FindManyDtoValidator } from '@common/dto/find-mant-documents.dto';
import { Metadata } from '@grpc/grpc-js';
import { GetMetadata } from '@common/decorators';

@ApiTags(ENDPOINTS.REVIEWS.BASE)
@Controller(ENDPOINTS.REVIEWS.BASE)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(TokenGuard)
  @ApiOperation(API_OPERATION.REVIEWS.CREATE)
  @Post(ENDPOINTS.REVIEWS.CREATE)
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @GetMetadata() metadata: Metadata,
  ) {
    const data = await this.reviewService.create(createReviewDto, metadata);
    return {
      ...data,
      message: RESPONSE_MESSAGES.REVIEWS.CREATE,
    };
  }

  @ApiOperation(API_OPERATION.REVIEWS.FIND_ALL)
  @Get(ENDPOINTS.REVIEWS.FIND_ALL)
  async findAll(
    @Query() query: FindManyDtoValidator,
    @GetMetadata() metadata: Metadata,
  ) {
    const data = await this.reviewService.findAll(query, metadata);
    return {
      ...data,
      message: RESPONSE_MESSAGES.REVIEWS.FIND_ALL,
    };
  }

  @ApiOperation(API_OPERATION.REVIEWS.FIND_ONE)
  @Get(ENDPOINTS.REVIEWS.FIND_ONE)
  async findOne(@Param('id') id: string, @GetMetadata() metadata: Metadata) {
    const data = await this.reviewService.findOne(id, metadata);
    return {
      ...data,
      message: RESPONSE_MESSAGES.REVIEWS.FIND_ONE,
    };
  }

  @ApiOperation(API_OPERATION.REVIEWS.FIND_BY_FILM)
  @Get(ENDPOINTS.REVIEWS.FIND_BY_FILM)
  async findByFilm(
    @Param('filmId') filmId: string,
    @GetMetadata() metadata: Metadata,
  ) {
    const data = await this.reviewService.findByFilm(filmId, metadata);
    return {
      ...data,
      message: RESPONSE_MESSAGES.REVIEWS.FIND_BY_FILM,
    };
  }

  @UseGuards(TokenGuard)
  @ApiOperation(API_OPERATION.REVIEWS.UPDATE)
  @Patch(ENDPOINTS.REVIEWS.UPDATE)
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @GetMetadata() metadata: Metadata,
  ) {
    const data = await this.reviewService.update(id, updateReviewDto, metadata);
    return {
      ...data,
      message: RESPONSE_MESSAGES.REVIEWS.UPDATE,
    };
  }

  @UseGuards(TokenGuard)
  @ApiOperation(API_OPERATION.REVIEWS.REMOVE)
  @Delete(ENDPOINTS.REVIEWS.REMOVE)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @GetMetadata() metadata: Metadata) {
    const data = await this.reviewService.remove(id, metadata);
    return {
      ...data,
      message: RESPONSE_MESSAGES.REVIEWS.REMOVE,
    };
  }

  @ApiOperation(API_OPERATION.REVIEWS.GET_BY_USER)
  @Get(ENDPOINTS.REVIEWS.FIND_BY_USER)
  async findByUser(@Param('userId') userId: string) {
    const data = await this.reviewService.findByUser(userId);
    return {
      ...data,
      message: RESPONSE_MESSAGES.REVIEWS.FIND_BY_USER,
    };
  }
}
