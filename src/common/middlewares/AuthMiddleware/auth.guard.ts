/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AppError } from '@common/errors/AppError';

@Injectable()
class AuthGuard implements CanActivate {
  private jwtSecret: string | undefined;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('AUTH_ACCESS_TOKEN_SECRET');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      request['user'] = null;
      return true;
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new AppError({
        name: 'Invalid Authorization Header',
        errorCode: 'invalid_authorization_header',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });

      request['user'] = decoded.user;
    } catch (error) {
      throw new AppError({
        name: 'Invalid Token',
        errorCode: 'invalid_token',
        statusCode: HttpStatus.UNAUTHORIZED,
        data: error,
      });
    }

    return true;
  }
}

export default AuthGuard;
