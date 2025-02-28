import {
  Controller,
  Body,
  Post,
  HttpStatus,
  Get,
  Patch,
  Param,
  HttpCode,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';

import ValidationError from '@common/errors/ZodError';

import {
  ICreateUserDoc,
  ICreateUserResponseDoc,
  IGetUserResponseDoc,
  IUpdateUserDoc,
} from './docs';

import { CreateUserSchema, CreateUserService } from './useCases/CreateUser';
import { GetUserService, IGetUserResponse } from './useCases/GetUser';
import { UpdateUserSchema, UpdateUserService } from './useCases/UpdateUser';

@ApiTags('Users')
@Controller('users')
class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: ICreateUserDoc,
  })
  @ApiResponse({
    description: 'User Created',
    type: ICreateUserResponseDoc,
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
  public async create(
    @Body() data: ICreateUserDoc,
  ): Promise<ICreateUserResponseDoc> {
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

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    description: 'User Found',
    type: IGetUserResponseDoc,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'ThrottlerException: Too Many Requests',
    status: HttpStatus.TOO_MANY_REQUESTS,
  })
  @Get('/:user')
  public async get(@Param('user') user: string): Promise<IGetUserResponse> {
    const userRecord = await this.getUserService.execute({
      user: Number(user),
    });

    return instanceToInstance(userRecord);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: IUpdateUserDoc,
  })
  @ApiResponse({
    description: 'User Updated',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    description: 'ThrottlerException: Too Many Requests',
    status: HttpStatus.TOO_MANY_REQUESTS,
  })
  @Patch('/:user')
  public async update(
    @Param('user') user: string,
    @Body() data: IUpdateUserDoc,
  ): Promise<void> {
    const dataParsed = await UpdateUserSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    await this.updateUserService.execute({
      user: Number(user),
      data: dataParsed,
    });
  }
}

export default UserController;
