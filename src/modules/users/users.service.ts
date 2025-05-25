import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FindManyDtoValidator } from '@common/dto/find-mant-documents.dto';
import { firstValueFrom } from 'rxjs';
import {
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@proto/user/user';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(USER_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async create(createUserDto: CreateUserDto) {
    return await firstValueFrom(this.userService.createUser(createUserDto));
  }

  async findMany(options: FindManyDtoValidator) {
    return await firstValueFrom(
      this.userService.findUsers({
        ...options,
      }),
    );
  }

  async findOne(id: string) {
    return await firstValueFrom(
      this.userService.findOneUser({
        id,
      }),
    );
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await firstValueFrom(
      this.userService.updateUser({
        ...updateUserDto,
        id,
      }),
    );
  }

  async remove(id: string) {
    return await firstValueFrom(
      this.userService.deleteUser({
        id,
      }),
    );
  }
}
