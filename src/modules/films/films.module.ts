import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { join } from 'path';
import { PROTO_PATH } from '@lib/src';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FILM_PACKAGE_NAME } from '@proto/films/films';
import { CONFIG } from '@common/constants';
import { UsersModule } from '@modules/users/users.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FILM_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: FILM_PACKAGE_NAME,
          protoPath: join(__dirname, `../../${PROTO_PATH}/films/films.proto`),
          loader: {
            keepCase: false,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
            includeDirs: [join(__dirname, `../../${PROTO_PATH}`)],
          },
          url: CONFIG.FILM_SERVICE_URL,
        },
      },
    ]),
    UsersModule,
    ReviewModule,
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
