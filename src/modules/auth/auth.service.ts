import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
} from '@proto/auth/auth';
import { LoginDto, RegisterDto, RemoveSessionsDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async login(loginDto: LoginDto) {
    return await firstValueFrom(
      this.authService.login({
        email: loginDto.email,
        password: loginDto.password,
      }),
    );
  }

  async register(registerDto: RegisterDto) {
    return await firstValueFrom(
      this.authService.register({
        name: registerDto.name,
        email: registerDto.email,
        password: registerDto.password,
      }),
    );
  }

  async refresh() {
    return await firstValueFrom(this.authService.refresh({}));
  }

  async logout() {
    return await firstValueFrom(this.authService.logout({}));
  }

  async getSessions() {
    return await firstValueFrom(this.authService.getSessions({}));
  }

  async removeSessions(removeSessionsDto: RemoveSessionsDto) {
    return await firstValueFrom(
      this.authService.removeSessions({
        ids: removeSessionsDto.ids,
      }),
    );
  }
}
