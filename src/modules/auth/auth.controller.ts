import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RemoveSessionsDto } from './dto';
import { AuthGuard } from '@lib/src/guards';
import { TokenTypeDecorator } from '@lib/src/decorators';
import { TokenType } from '@proto/auth/auth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATION, ENDPOINTS, RESPONSE_MESSAGES } from '@common/constants';
import { CookieUtil } from '@common/utils';
import { Response } from 'express';

@ApiTags(ENDPOINTS.AUTH.BASE)
@Controller(ENDPOINTS.AUTH.BASE)
export class AuthController {
  constructor(private readonly apiGatewayService: AuthService) {}

  @ApiOperation(API_OPERATION.AUTH.LOGIN)
  @Post(ENDPOINTS.AUTH.LOGIN)
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const data = await this.apiGatewayService.login(loginDto);
    return {
      ...data,
      message: RESPONSE_MESSAGES.AUTH.LOGIN,
    };
  }

  @ApiOperation(API_OPERATION.AUTH.REGISTER)
  @Post(ENDPOINTS.AUTH.REGISTER)
  async register(@Body() registerDto: RegisterDto) {
    const data = await this.apiGatewayService.register(registerDto);
    return {
      ...data,
      message: RESPONSE_MESSAGES.AUTH.REGISTER,
    };
  }

  @ApiOperation(API_OPERATION.AUTH.REFRESH_TOKEN)
  @TokenTypeDecorator(TokenType.REFRESH)
  @UseGuards(AuthGuard)
  @Post(ENDPOINTS.AUTH.REFRESH)
  @HttpCode(HttpStatus.OK)
  async refresh() {
    const data = await this.apiGatewayService.refresh();
    return {
      ...data,
      message: RESPONSE_MESSAGES.AUTH.REFRESH,
    };
  }

  @ApiOperation(API_OPERATION.AUTH.LOGOUT)
  @UseGuards(AuthGuard)
  @Post(ENDPOINTS.AUTH.LOGOUT)
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.apiGatewayService.logout();
    CookieUtil.clearToken(res);
    return {
      success: true,
      message: RESPONSE_MESSAGES.AUTH.LOGOUT,
    };
  }

  @ApiOperation(API_OPERATION.AUTH.GET_SESSIONS)
  @UseGuards(AuthGuard)
  @Get(ENDPOINTS.AUTH.GET_SESSIONS)
  async getSessions() {
    const data = await this.apiGatewayService.getSessions();
    return {
      ...data,
      message: RESPONSE_MESSAGES.AUTH.GET_SESSIONS,
    };
  }

  @ApiOperation(API_OPERATION.AUTH.REMOVE_SESSIONS)
  @UseGuards(AuthGuard)
  @Delete(ENDPOINTS.AUTH.REMOVE_SESSIONS)
  @HttpCode(HttpStatus.OK)
  async removeSessions(@Body() removeSessionsDto: RemoveSessionsDto) {
    const data = await this.apiGatewayService.removeSessions(removeSessionsDto);
    return {
      ...data,
      message: RESPONSE_MESSAGES.AUTH.REMOVE_SESSIONS,
    };
  }
}
