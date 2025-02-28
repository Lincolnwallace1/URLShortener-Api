import { Controller, Body, Post, HttpStatus, HttpCode } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import ValidationError from '@common/errors/ZodError';

import { ICreateUser, ICreateUserResponse } from './docs';

import { CreateUserSchema, CreateUserService } from './useCases/CreateUser';

@ApiTags('Users')
@Controller('users')
class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: ICreateUser,
  })
  @ApiResponse({
    description: 'User Created',
    type: ICreateUserResponse,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'User already exists',
    status: HttpStatus.CONFLICT,
  })
  @ApiResponse({
    description: 'ThrottlerException: Too Many Requests',
    status: HttpStatus.TOO_MANY_REQUESTS,
  })
  @Post('/')
  public async create(@Body() data: ICreateUser): Promise<ICreateUserResponse> {
    const dataParsed = await CreateUserSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    const user = await this.createUserService.execute({ data: dataParsed });

    return {
      id: user.id,
    };
  }
}

export default UserController;
