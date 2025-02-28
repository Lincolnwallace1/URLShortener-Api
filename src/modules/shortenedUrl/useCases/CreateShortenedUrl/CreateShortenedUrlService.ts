import { Inject, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { IsNull } from 'typeorm';

import { AppError } from '@common/errors/AppError';

import ShortenedUrlRepository from '@modules/shortenedUrl/repository/ShortenedUrlRepository';

import ShortenedUrlSchema from './CreateShortenedUrlSchema';
import ICreateShortenedUrlResponse from './ICreateShortenedUrlResponse';

interface IRequest {
  data: Z.infer<typeof ShortenedUrlSchema>;
}

class CreateShortenedUrlService {
  constructor(
    @Inject(ShortenedUrlRepository)
    private shortenedUrlRepository: ShortenedUrlRepository,
  ) {}

  public async execute({
    data,
  }: IRequest): Promise<ICreateShortenedUrlResponse> {
    const hash = uuidv4().substring(0, 6);
    const urlObj = new URL(data.url);
    const shortnedUrl = `${urlObj.protocol}//${urlObj.host}/${hash}`;

    const shortenedUrlRecord = await this.shortenedUrlRepository.get({
      originalUrl: data.url,
      dateDeletion: IsNull(),
    });

    if (shortenedUrlRecord) {
      throw new AppError({
        name: 'OriginalUrl Already Exists',
        errorCode: 'originalUrl_already_exists',
        statusCode: HttpStatus.CONFLICT,
      });
    }

    const shortenedUrl = await this.shortenedUrlRepository.create({
      originalUrl: data.url,
      shortenedUrl: shortnedUrl,
    });

    return {
      id: shortenedUrl.id,
    };
  }
}

export default CreateShortenedUrlService;
