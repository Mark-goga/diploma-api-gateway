import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constants';
import { GrpcMetadataService } from '@common/services';
import { CookieUtil } from '@common/utils';

export class TokenGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const grpcMetadataService = new GrpcMetadataService();
    const request = context.switchToHttp().getRequest();

    const accessToken = this.getTokenFromHeaders(context);
    const refreshToken = this.getTokenFromCookies(context);
    grpcMetadataService.setAccessToken(accessToken);
    grpcMetadataService.setRefreshToken(refreshToken);

    request.metaForGrpc = grpcMetadataService.getMetadata();

    return true;
  }

  private getTokenFromHeaders(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTH.AUTHORIZATION_NOT_FOUND,
      );
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTH.AUTHORIZATION_INVALID,
      );
    }

    return token;
  }

  private getTokenFromCookies(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const refreshToken = CookieUtil.getToken(request);
    if (!refreshToken) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTH.REFRESH_TOKEN_NOT_FOUND,
      );
    }
    return refreshToken;
  }
}
