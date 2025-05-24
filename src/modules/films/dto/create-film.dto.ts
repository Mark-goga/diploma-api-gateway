import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { API_PROPERTY } from '@common/constants';

export class CreateFilmDto {
  @ApiProperty(API_PROPERTY.FILMS.TITLE)
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty(API_PROPERTY.FILMS.DESCRIPTION)
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty(API_PROPERTY.FILMS.DIRECTOR)
  @IsNotEmpty()
  @IsString()
  director: string;

  @ApiProperty(API_PROPERTY.FILMS.RELEASE_DATE)
  @IsNotEmpty()
  @IsString()
  releaseDate: string;

  @ApiProperty(API_PROPERTY.FILMS.GENRE)
  @IsNotEmpty()
  @IsString()
  genre: string;

  @ApiProperty(API_PROPERTY.FILMS.BACKGROUND_IMAGE_KEY)
  @IsOptional()
  @IsString()
  backGroundImageKey: string;
}
