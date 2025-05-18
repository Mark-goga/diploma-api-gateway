import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { API_PROPERTY } from '@common/constants';

export class RemoveSessionsDto {
  @ApiProperty(API_PROPERTY.IDS)
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  ids: string[];
}
