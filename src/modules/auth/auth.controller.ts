import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import ValidationError from '@common/errors/ZodError';
import { ILoginDoc, ILoginResponseDoc } from './docs/LoginDoc';

import { LoginSchema, LoginService } from './useCases/Login';

@ApiTags('Auth')
@Controller('auth')
class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'Login' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'User Logged',
    type: ILoginResponseDoc,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Post('/')
  public async login(@Body() data: ILoginDoc): Promise<ILoginResponseDoc> {
    const dataParsed = await LoginSchema.parseAsync(data).catch((error) => {
      throw new ValidationError(error);
    });

    const login = await this.loginService.execute({ data: dataParsed });

    return login;
  }
}

export default AuthController;
