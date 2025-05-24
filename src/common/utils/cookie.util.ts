import { Response } from 'express';
import { CONFIG } from '@common/constants';

export class CookieUtil {
  private static readonly tokenKey = 'refreshToken';

  static setToken(res: Response, token: string) {
    res.cookie(this.tokenKey, token, {
      httpOnly: true,
      secure: CONFIG.NODE_ENV !== 'development',
    });
  }

  static clearToken(res: Response) {
    res.clearCookie(this.tokenKey);
  }

  static getToken(req: any): string | null {
    return req.cookies?.[this.tokenKey] || null;
  }
}
