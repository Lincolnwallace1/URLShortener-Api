import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './common/datebase/database.module';
import { UserModule } from './modules/user/user.module';
import { ShortenedUrlModule } from './modules/shortenedUrl/shortenedUrl.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    ShortenedUrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
