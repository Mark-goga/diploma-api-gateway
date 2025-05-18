import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CookieUtil } from '@common/utils';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const { refreshToken, message, ...otherData } = data;

        if (refreshToken) {
          CookieUtil.setToken(response, refreshToken);
        }

        return {
          success: true,
          message,
          data: otherData,
        };
      }),
    );
  }
}
