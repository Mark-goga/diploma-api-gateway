import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { GlobalInterceptor } from '@common/interceptors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CONFIG, ENDPOINTS } from '@common/constants';
import { GrpcExceptionFilter } from '@common/filters';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalFilters(new GrpcExceptionFilter());
  app.use(cookieParser());
  app.setGlobalPrefix(ENDPOINTS.BASE);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('diploma')
    .setDescription('The diploma API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(CONFIG.PORT, '0.0.0.0');
}

bootstrap();
