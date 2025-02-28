import { Module } from '@nestjs/common';
import { DatabaseModule } from '@common/datebase/database.module';

import ShortenedUrlProviders from './shortenedUrl.provider';
import ShortenedUrlRepository from './repository/ShortenedUrlRepository';

@Module({
  imports: [DatabaseModule],
  providers: [...ShortenedUrlProviders, ShortenedUrlRepository],
  controllers: [],
  exports: [],
})
export class ShortenedUrlModule {}
