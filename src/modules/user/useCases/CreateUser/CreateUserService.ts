import { Inject, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import * as argon2 from 'argon2';

import { AppError } from '@common/errors/AppError';

import UserRepository from '@modules/user/repository/UserRepository';

import CreateUserSchema from './CreateUserSchema';
import ICreateUserResponse from './ICreateUserResponse';

interface IRequest {
  data: Z.infer<typeof CreateUserSchema>;
}

class CreateUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute({ data }: IRequest): Promise<ICreateUserResponse> {
    const userRecord = await this.userRepository.get({
      email: data.email,
      enabled: true,
    });

    if (userRecord) {
      throw new AppError({
        name: 'User Already Exists',
        errorCode: 'user_already_exists',
        statusCode: HttpStatus.CONFLICT,
      });
    }

    const user = await this.userRepository.create({
      email: data.email,
      fullname: data.fullname,
      password: await argon2.hash(data.password),
    });

    return {
      id: user.id,
    };
  }
}

export default CreateUserService;
