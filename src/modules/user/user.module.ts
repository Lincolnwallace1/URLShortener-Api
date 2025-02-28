import { Module } from '@nestjs/common';
import { DatabaseModule } from '@common/datebase/database.module';

import UserRepository from './repository/UserRepository';
import UserProviders from './user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository, ...UserProviders],
  controllers: [],
  exports: [UserRepository],
})
export class UserModule {}
