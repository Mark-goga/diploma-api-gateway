import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PROTO_PATH } from '@lib/src';
import { USER_PACKAGE_NAME } from '@proto/user/user';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(__dirname, `../../${PROTO_PATH}/user/user.proto`),
          loader: {
            keepCase: false,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
            includeDirs: [join(__dirname, `../../${PROTO_PATH}`)],
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
