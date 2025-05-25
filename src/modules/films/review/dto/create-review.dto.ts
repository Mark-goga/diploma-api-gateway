import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { API_PROPERTY } from '@common/constants';

export class CreateReviewDto {
  @ApiProperty(API_PROPERTY.REVIEW.FILM_ID)
  @IsString()
  @IsNotEmpty()
  filmId: string;

  @ApiProperty(API_PROPERTY.REVIEW.DESCRIPTION)
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty(API_PROPERTY.REVIEW.TITLE)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty(API_PROPERTY.REVIEW.RATING)
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  rating: number;
}
