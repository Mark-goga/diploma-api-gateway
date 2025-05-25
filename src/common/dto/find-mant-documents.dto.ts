import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { plainToClass, Transform, Type } from 'class-transformer';
import { SortDirection } from '@proto/common/common';

class PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({
    description: 'The page number to retrieve',
    example: 1,
  })
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
  })
  limit: number;
}

class SortingDtoValidator {
  @ApiProperty({
    description: 'The field to sort by',
    example: 'title',
  })
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty({
    description: 'The direction to sort by',
    enum: SortDirection,
    example: SortDirection.SORT_DIRECTION_ASC,
  })
  @IsEnum(SortDirection)
  @IsNotEmpty()
  direction: number;
}

class FilterDtoValidator {
  @ApiProperty({
    description: 'The field to filter by',
    example: 'genre',
  })
  @IsString()
  field: string;

  @ApiProperty({
    description: 'The value to filter by',
    example: 'Action',
  })
  @IsString()
  value: string;
}

export class FindManyDtoValidator {
  @ApiProperty({
    description: 'Pagination parameters as JSON string',
    example: '{"page":1,"limit":20}',
  })
  @Transform(({ value }) => {
    if (typeof value === 'object') {
      return plainToClass(PaginationDto, value);
    }
    try {
      const parsed = JSON.parse(value);
      return plainToClass(PaginationDto, parsed);
    } catch {
      return value;
    }
  })
  @ValidateNested()
  @Type(() => PaginationDto)
  @IsNotEmpty()
  pagination: PaginationDto;

  @ApiProperty({
    description: 'Sorting details for the query as JSON string',
    example: '{"field":"title","direction":0}',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return undefined;
    if (typeof value === 'object') {
      return plainToClass(SortingDtoValidator, value);
    }
    try {
      const parsed = JSON.parse(value);
      return plainToClass(SortingDtoValidator, parsed);
    } catch {
      return value;
    }
  })
  @ValidateNested()
  @Type(() => SortingDtoValidator)
  sorting: SortingDtoValidator | undefined;

  @ApiProperty({
    description: 'Filters to apply to the query as JSON array string',
    example:
      '[{"field": "genre","value": "Thriller,Horror"},{"field": "title","value": "Bullet Train"}]',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return undefined;
    if (typeof value === 'object') {
      return Array.isArray(value)
        ? value.map((item) => plainToClass(FilterDtoValidator, item))
        : value;
    }
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed)
        ? parsed.map((item) => plainToClass(FilterDtoValidator, item))
        : parsed;
    } catch {
      return value;
    }
  })
  @ValidateNested({ each: true })
  @Type(() => FilterDtoValidator)
  filters: FilterDtoValidator[];
}
