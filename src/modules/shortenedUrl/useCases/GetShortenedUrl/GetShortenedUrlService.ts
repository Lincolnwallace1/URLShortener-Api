import { Inject, HttpStatus } from '@nestjs/common';
import { IsNull } from 'typeorm';
import { AppError } from '@common/errors/AppError';

import ShortenedUrlRepository from '@modules/shortenedUrl/repository/ShortenedUrlRepository';

import IGetShortenedUrlResponse from './IGetShortenedUrlResponse';

interface IRequest {
  shortenedUrl: string;
}

class GetShortenedUrlService {
  constructor(
    @Inject(ShortenedUrlRepository)
    private shortenedUrlRepository: ShortenedUrlRepository,
  ) {}

  public async execute({
    shortenedUrl,
  }: IRequest): Promise<IGetShortenedUrlResponse> {
    const shortenedUrlRecord = await this.shortenedUrlRepository.get({
      shortenedUrl,
      dateDeletion: IsNull(),
    });

    if (!shortenedUrlRecord) {
      throw new AppError({
        name: 'Shortened not found',
        errorCode: 'originalUrl_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const response = {
      id: shortenedUrlRecord.id,
      originalUrl: shortenedUrlRecord.originalUrl,
      shortenedUrl: shortenedUrlRecord.shortenedUrl,
      dateDeletion: shortenedUrlRecord.dateDeletion,
      clickCount: shortenedUrlRecord.clickCount,
      updatedAt: shortenedUrlRecord.updatedAt,
    };

    await this.shortenedUrlRepository.update(shortenedUrlRecord.id, {
      clickCount: shortenedUrlRecord.clickCount + 1,
    });

    return response;
  }
}

export default GetShortenedUrlService;
