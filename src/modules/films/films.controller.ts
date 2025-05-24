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
import { FilmsService } from './films.service';
import { CreateFilmDto, FindManyDtoValidator, UpdateFilmDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATION, ENDPOINTS, RESPONSE_MESSAGES } from '@common/constants';
import { TokenGuard } from '@common/guards';
import { GetMetadata } from '@common/decorators';
import { Metadata } from '@grpc/grpc-js';

@ApiTags(ENDPOINTS.FILMS.BASE)
@Controller(ENDPOINTS.FILMS.BASE)
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @UseGuards(TokenGuard)
  @ApiOperation(API_OPERATION.FILMS.CREATE)
  @Post(ENDPOINTS.FILMS.CREATE)
  async create(
    @Body() createFilmDto: CreateFilmDto,
    @GetMetadata() meta: Metadata,
  ) {
    const data = await this.filmsService.create(createFilmDto, meta);
    return {
      ...data,
      message: RESPONSE_MESSAGES.FILMS.CREATE,
    };
  }

  @ApiOperation(API_OPERATION.FILMS.FIND_ALL)
  @Get(ENDPOINTS.FILMS.FIND_ALL)
  async findAll(@Query() query: FindManyDtoValidator) {
    const data = await this.filmsService.findAll(query);
    return {
      ...data,
      message: RESPONSE_MESSAGES.FILMS.FIND_ALL,
    };
  }

  @ApiOperation(API_OPERATION.FILMS.FIND_ONE)
  @Get(ENDPOINTS.FILMS.FIND_ONE)
  async findOne(@Param('id') id: string) {
    const data = await this.filmsService.findOne(id);
    return {
      ...data,
      message: RESPONSE_MESSAGES.FILMS.FIND_ONE,
    };
  }

  @UseGuards(TokenGuard)
  @ApiOperation(API_OPERATION.FILMS.UPDATE)
  @Patch(ENDPOINTS.FILMS.UPDATE)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateFilmDto: UpdateFilmDto,
    @GetMetadata() meta: Metadata,
  ) {
    const data = await this.filmsService.update(id, updateFilmDto, meta);
    return {
      ...data,
      message: RESPONSE_MESSAGES.FILMS.UPDATE,
    };
  }

  @UseGuards(TokenGuard)
  @ApiOperation(API_OPERATION.FILMS.REMOVE)
  @Delete(ENDPOINTS.FILMS.REMOVE)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @GetMetadata() meta: Metadata) {
    const data = await this.filmsService.remove(id, meta);
    return {
      ...data,
      message: RESPONSE_MESSAGES.FILMS.REMOVE,
    };
  }
}
