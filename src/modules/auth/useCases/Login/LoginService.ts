import { Injectable, HttpStatus } from '@nestjs/common';
import Z from 'zod';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AppError } from '@common/errors/AppError';

import UserRepository from '@modules/user/repository/UserRepository';

import LoginSchema from './LoginSchema';

import IResponse from './ILoginResponse';

interface IRequest {
  data: Z.infer<typeof LoginSchema>;
}

@Injectable()
class LoginService {
  private jwtExpiresIn: number;

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const expiresIn = this.configService.get<string>('AUTH_ACCESS_TOKEN_EXP');
    this.jwtExpiresIn = isNaN(Number(expiresIn)) ? 1200 : Number(expiresIn);
  }

  public async execute({ data }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.get({
      email: data.email,
      enabled: true,
    });

    if (!user) {
      throw new AppError({
        name: 'User Not Found',
        errorCode: 'user_not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const passwordMatch = await argon2.verify(user.password, data.password);

    if (!passwordMatch) {
      throw new AppError({
        name: 'Invalid Password',
        errorCode: 'invalid_password',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    const token = this.jwtService.sign(
      { user: user.id },
      { expiresIn: this.jwtExpiresIn },
    );

    return { accessToken: token, expiresIn: this.jwtExpiresIn };
  }
}

export default LoginService;
