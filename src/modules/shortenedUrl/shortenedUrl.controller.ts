import {
  Controller,
  Body,
  Post,
  HttpStatus,
  HttpCode,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';

import ValidationError from '@common/errors/ZodError';

import {
  ICreateShortenedUrlDoc,
  ICreateShortenedUrlResponseDoc,
  IGetShortenedUrlResponseDoc,
  IUpdateShortenetDoc,
} from './docs';

import {
  CreateShortenedUrlSchema,
  CreateShortenedUrlService,
} from './useCases/CreateShortenedUrl';

import { GetShortenedUrlService } from './useCases/GetShortenedUrl';

import {
  UpdateShortenedUrlSchema,
  UpdateShortenedUrlService,
} from './useCases/UpdateShortenedUrl';

import { DeleteShortenedUrlService } from './useCases/DeleteShortenedUrl';

@ApiTags('ShortenedUrls')
@Controller('shortenedUrls')
class ShortenedUrlsController {
  constructor(
    private readonly createShortenedUrlService: CreateShortenedUrlService,
    private readonly getShortenedUrlService: GetShortenedUrlService,
    private readonly updateShortenedUrlService: UpdateShortenedUrlService,
    private readonly deleteShortenedUrlService: DeleteShortenedUrlService,
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
      shortenedUrl: shortenedUrl.shortenedUrl,
    };
  }

  @ApiOperation({ summary: 'Get shortenedUrl by shortenedUrl' })
  @ApiResponse({
    description: 'ShortenedUrl Found',
    type: IGetShortenedUrlResponseDoc,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'ShortenedUrl not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @Get('/:shortenedUrl')
  public async get(
    @Param('shortenedUrl') shortenedUrl: string,
  ): Promise<IGetShortenedUrlResponseDoc> {
    const shortenedUrlRecord = await this.getShortenedUrlService.execute({
      shortenedUrl,
    });

    return instanceToInstance(shortenedUrlRecord);
  }

  @ApiOperation({ summary: 'Update shortenedUrl by id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: IUpdateShortenetDoc,
  })
  @ApiResponse({
    description: 'ShortenedUrl Updated',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'ShortenedUrl not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @Patch('/:shortenedUrl')
  public async update(
    @Param('shortenedUrl') shortenedUrl: string,
    @Body() data: IUpdateShortenetDoc,
  ): Promise<void> {
    const dataParsed = await UpdateShortenedUrlSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    await this.updateShortenedUrlService.execute({
      shortenedUrl: Number(shortenedUrl),
      data: dataParsed,
    });
  }

  @ApiOperation({ summary: 'Update shortenedUrl by id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    description: 'ShortenedUrl Deleted',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'ShortenedUrl not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @Delete('/:shortenedUrl')
  public async delete(
    @Param('shortenedUrl') shortenedUrl: string,
  ): Promise<void> {
    await this.deleteShortenedUrlService.execute({
      shortenedUrl: Number(shortenedUrl),
    });
  }
}

export default ShortenedUrlsController;
