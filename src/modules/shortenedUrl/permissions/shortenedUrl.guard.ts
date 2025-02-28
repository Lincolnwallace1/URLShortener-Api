/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpStatus,
  Inject,
} from '@nestjs/common';

import { AppError } from '@common/errors/AppError';

import ShortenedUrlRepository from '@modules/shortenedUrl/repository/ShortenedUrlRepository';

@Injectable()
class ShortenedUrlsGuard implements CanActivate {
  constructor(
    @Inject(ShortenedUrlRepository)
    private shortenedUrlRepository: ShortenedUrlRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    const shortenedUrl = request.params.shortenedUrl
      ? await this.shortenedUrlRepository.get({
          id: Number(request.params.shortenedUrl),
          enabled: true,
        })
      : null;

    if (!user) {
      throw new AppError({
        name: 'Unauthorized',
        errorCode: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    if (shortenedUrl?.user === null || shortenedUrl?.user !== user) {
      throw new AppError({
        name: 'Unauthorized',
        errorCode: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    return true;
  }
}

export default ShortenedUrlsGuard;
