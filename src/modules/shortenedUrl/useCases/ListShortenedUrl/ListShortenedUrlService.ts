import { Inject } from '@nestjs/common';
import Z from 'zod';
import { IsNull } from 'typeorm';

import ShortenedUrlRepository from '@modules/shortenedUrl/repository/ShortenedUrlRepository';

import ListShortenedSchema from './ListShortenedUrlSchema';
import IListShortenedUrlResponse from './IListShortenedUrlResponse';

interface IRequest {
  user?: number;
  data: Z.infer<typeof ListShortenedSchema>;
}

class ListShortenedUrlService {
  constructor(
    @Inject(ShortenedUrlRepository)
    private shortenedUrlRepository: ShortenedUrlRepository,
  ) {}

  public async execute({
    data,
    user,
  }: IRequest): Promise<IListShortenedUrlResponse> {
    const [shortenedUrlRecords, count] = await this.shortenedUrlRepository.list(
      {
        user,
        dateDeletion: IsNull(),
      },
      [],
      data.limit,
      data.offset,
    );

    const response: IListShortenedUrlResponse = {
      metaData: {
        limit: data.limit,
        offset: data.offset,
        total: count,
      },
      records: shortenedUrlRecords.map((shortenedUrlRecord) => ({
        shortenedUrls: {
          id: shortenedUrlRecord.id,
          originalUrl: shortenedUrlRecord.originalUrl,
          shortenedUrl: shortenedUrlRecord.shortenedUrl,
          clickCount: shortenedUrlRecord.clickCount,
          updatedAt: shortenedUrlRecord.updatedAt,
        },
      })),
    } as IListShortenedUrlResponse;

    return response;
  }
}

export default ListShortenedUrlService;
