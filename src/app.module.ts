import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './common/datebase/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ShortenedUrlModule } from './modules/shortenedUrl/shortenedUrl.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ShortenedUrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
