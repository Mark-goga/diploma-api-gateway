import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PROTO_PATH } from '@lib/src';
import { REVIEW_PACKAGE_NAME } from '@proto/review/review';
import { CONFIG } from '@common/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: REVIEW_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: REVIEW_PACKAGE_NAME,
          protoPath: join(
            __dirname,
            `../../../${PROTO_PATH}/review/review.proto`,
          ),
          loader: {
            keepCase: false,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
            includeDirs: [join(__dirname, `../../../${PROTO_PATH}`)],
          },
          url: CONFIG.FILM_SERVICE_URL,
        },
      },
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
