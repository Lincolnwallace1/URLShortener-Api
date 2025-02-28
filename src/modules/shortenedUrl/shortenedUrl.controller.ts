import { Controller, Body, Post, HttpStatus, HttpCode } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import ValidationError from '@common/errors/ZodError';

import { ICreateShortenedUrlDoc, ICreateShortenedUrlResponseDoc } from './docs';

import {
  CreateShortenedUrlSchema,
  CreateShortenedUrlService,
} from './useCases/CreateShortenedUrl';

@ApiTags('ShortenedUrls')
@Controller('shortenedUrls')
class ShortenedUrlsController {
  constructor(
    private readonly createShortenedUrlService: CreateShortenedUrlService,
  ) {}

  @ApiOperation({ summary: 'Create a new shortened url' })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: ICreateShortenedUrlDoc,
  })
  @ApiResponse({
    description: 'Shortened Created',
    type: ICreateShortenedUrlResponseDoc,
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
    description: 'Shortened already exists',
    status: HttpStatus.CONFLICT,
  })
  @Post('/')
  public async create(
    @Body() data: ICreateShortenedUrlDoc,
  ): Promise<ICreateShortenedUrlResponseDoc> {
    const dataParsed = await CreateShortenedUrlSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    const shortenedUrl = await this.createShortenedUrlService.execute({
      data: dataParsed,
    });

    return {
      id: shortenedUrl.id,
    };
  }
}

export default ShortenedUrlsController;
