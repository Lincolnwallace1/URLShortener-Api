import { Inject, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import { IsNull } from 'typeorm';
import { AppError } from '@common/errors/AppError';

import ShortenedUrlRepository from '@modules/shortenedUrl/repository/ShortenedUrlRepository';

import UpdateShortenedUrlSchema from './UpdateShortenedUrlSchema';

interface IRequest {
  shortenedUrl: number;
  data: Z.infer<typeof UpdateShortenedUrlSchema>;
}

class GetShortenedUrlService {
  constructor(
    @Inject(ShortenedUrlRepository)
    private shortenedUrlRepository: ShortenedUrlRepository,
  ) {}

  public async execute({ shortenedUrl, data }: IRequest): Promise<void> {
    const shortenedUrlRecord = await this.shortenedUrlRepository.get({
      id: shortenedUrl,
      dateDeletion: IsNull(),
    });

    if (!shortenedUrlRecord) {
      throw new AppError({
        name: 'Shortened not found',
        errorCode: 'originalUrl_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    await this.shortenedUrlRepository.update(shortenedUrlRecord.id, {
      originalUrl: data.url,
    });
  }
}

export default GetShortenedUrlService;
