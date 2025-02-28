import { Module } from '@nestjs/common';
import { DatabaseModule } from '@common/datebase/database.module';

import ShortenedUrlProviders from './shortenedUrl.provider';
import ShortenedUrlRepository from './repository/ShortenedUrlRepository';
import ShortenedUrlsController from './shortenedUrl.controller';

import { CreateShortenedUrlService } from './useCases/CreateShortenedUrl';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...ShortenedUrlProviders,
    ShortenedUrlRepository,
    CreateShortenedUrlService,
  ],
  controllers: [ShortenedUrlsController],
  exports: [],
})
export class ShortenedUrlModule {}
