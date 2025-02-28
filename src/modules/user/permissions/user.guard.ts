/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpStatus,
} from '@nestjs/common';

import { AppError } from '@common/errors/AppError';

@Injectable()
class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    if (!user) {
      throw new AppError({
        name: 'Unauthorized',
        errorCode: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    if (user !== +request.params.user) {
      throw new AppError({
        name: 'Unauthorized',
        errorCode: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    return true;
  }
}

export default UserGuard;
