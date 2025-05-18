import { Response } from 'express';

export class CookieUtil {
  private static readonly tokenKey = 'refreshToken';

  static setToken(res: Response, token: string) {
    res.cookie(this.tokenKey, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    });
  }

  static clearToken(res: Response) {
    res.clearCookie(this.tokenKey);
  }
}
