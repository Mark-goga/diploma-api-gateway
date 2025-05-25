import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  FILM_PACKAGE_NAME,
  FILM_SERVICE_NAME,
  FilmServiceClient,
} from '@proto/films/films';
import { CreateFilmDto, UpdateFilmDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { UsersService } from '@modules/users/users.service';
import { FindManyDtoValidator } from '@common/dto/find-mant-documents.dto';

@Injectable()
export class FilmsService implements OnModuleInit {
  private filmService: FilmServiceClient;

  constructor(
    @Inject(FILM_PACKAGE_NAME) private client: ClientGrpc,
    private readonly usersService: UsersService,
  ) {}

  onModuleInit() {
    this.filmService =
      this.client.getService<FilmServiceClient>(FILM_SERVICE_NAME);
  }

  async create(createFilmDto: CreateFilmDto, metadata: Metadata) {
    return await firstValueFrom(
      this.filmService.createFilm(createFilmDto, metadata),
    );
  }

  async findAll(options: FindManyDtoValidator) {
    return await firstValueFrom(
      this.filmService.findAll({
        ...options,
        search: '',
      }),
    );
  }

  async findOne(id: string) {
    const data = await firstValueFrom(
      this.filmService.findOne({
        id,
      }),
    );
    if (!data.reviews?.length || !data.reviews[0]?.userId) {
      return {
        film: data.film,
        reviews: [],
      };
    } else {
      const enrichedReviews = await Promise.all(
        data.reviews.map(async (review) => {
          const user = await this.usersService.findOne(review.userId);
          return { ...review, user };
        }),
      );
      return {
        film: data.film,
        reviews: enrichedReviews,
      };
    }
  }

  async update(id: string, updateFilmDto: UpdateFilmDto, metadata: Metadata) {
    return await firstValueFrom(
      this.filmService.update(
        {
          ...updateFilmDto,
          id,
        } as any,
        metadata,
      ),
    );
  }

  async remove(id: string, metadata: Metadata) {
    return await firstValueFrom(
      this.filmService.remove(
        {
          id,
        },
        metadata,
      ),
    );
  }
}
