import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  FILM_PACKAGE_NAME,
  FILM_SERVICE_NAME,
  FilmServiceClient,
} from '@proto/films/films';
import { CreateFilmDto, FindManyDtoValidator, UpdateFilmDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class FilmsService implements OnModuleInit {
  private filmService: FilmServiceClient;

  constructor(@Inject(FILM_PACKAGE_NAME) private client: ClientGrpc) {}

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
      }),
    );
  }

  async findOne(id: string) {
    return await firstValueFrom(
      this.filmService.findOne({
        id,
      }),
    );
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
