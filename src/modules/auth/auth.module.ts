import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserModule } from '@modules/user/user.module';

import { LoginService } from '@modules/auth/useCases/Login';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('AUTH_ACCESS_TOKEN_EXP'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [LoginService],
  controllers: [AuthController],
})
export class AuthModule {}
