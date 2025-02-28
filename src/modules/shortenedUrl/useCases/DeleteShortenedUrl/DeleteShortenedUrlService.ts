import { Inject, HttpStatus } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { AppError } from '@common/errors/AppError';

import ShortenedUrlRepository from '@modules/shortenedUrl/repository/ShortenedUrlRepository';

interface IRequest {
  shortenedUrl: number;
}

class DeleteShortenedUrlService {
  constructor(
    @Inject(ShortenedUrlRepository)
    private shortenedUrlRepository: ShortenedUrlRepository,
  ) {}

  public async execute({ shortenedUrl }: IRequest): Promise<void> {
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
      enabled: false,
      dateDeletion: new Date(),
    });
  }
}

export default DeleteShortenedUrlService;
