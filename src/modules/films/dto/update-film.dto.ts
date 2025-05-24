import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateFilmDto } from './create-film.dto';
import { API_PROPERTY } from '@common/constants';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  @ApiProperty(API_PROPERTY.ID)
  @IsNotEmpty()
  @IsString()
  id: string;
}
