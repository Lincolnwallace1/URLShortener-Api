import { Module } from '@nestjs/common';
import { DatabaseModule } from '@common/datebase/database.module';

import ShortenedUrlProviders from './shortenedUrl.provider';
import ShortenedUrlRepository from './repository/ShortenedUrlRepository';
import ShortenedUrlsController from './shortenedUrl.controller';

import { CreateShortenedUrlService } from './useCases/CreateShortenedUrl';
import { GetShortenedUrlService } from './useCases/GetShortenedUrl';
import { UpdateShortenedUrlService } from './useCases/UpdateShortenedUrl';
import { DeleteShortenedUrlService } from './useCases/DeleteShortenedUrl';
import { ListShortenedUrlService } from './useCases/ListShortenedUrl';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...ShortenedUrlProviders,
    ShortenedUrlRepository,
    CreateShortenedUrlService,
    GetShortenedUrlService,
    UpdateShortenedUrlService,
    DeleteShortenedUrlService,
    ListShortenedUrlService,
  ],
  controllers: [ShortenedUrlsController],
  exports: [],
})
export class ShortenedUrlModule {}
