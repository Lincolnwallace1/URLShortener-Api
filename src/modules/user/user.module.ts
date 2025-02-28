import { Module } from '@nestjs/common';
import { DatabaseModule } from '@common/datebase/database.module';

import UserProviders from './user.provider';
import UserRepository from './repository/UserRepository';
import UserController from './user.controller';

import { CreateUserService } from './useCases/CreateUser';

@Module({
  imports: [DatabaseModule],
  providers: [...UserProviders, UserRepository, CreateUserService],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
