import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { CONFIG } from '@common/constants';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: () => {
        const isProduction = CONFIG.NODE_ENV === 'production';
        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                  level: 'debug',
                },
          },
        };
      },
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
