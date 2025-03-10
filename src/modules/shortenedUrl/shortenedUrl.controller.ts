/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { instanceToInstance } from 'class-transformer';

import ValidationError from '@common/errors/ZodError';

import AuthGuard from '@common/middlewares/AuthMiddleware/auth.guard';
import ShortenedUrlsGuard from './permissions/shortenedUrl.guard';

import {
  ICreateShortenedUrlDoc,
  ICreateShortenedUrlResponseDoc,
  IGetShortenedUrlResponseDoc,
  IUpdateShortenetDoc,
  IListShortenedUrlDoc,
  IListShortenedUrlResponseDoc,
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

import {
  ListShortenedUrlSchema,
  ListShortenedUrlService,
} from './useCases/ListShortenedUrl';

@ApiTags('ShortenedUrls')
@ApiBearerAuth('Bearer')
@Controller('shortenedUrls')
class ShortenedUrlsController {
  constructor(
    private readonly createShortenedUrlService: CreateShortenedUrlService,
    private readonly getShortenedUrlService: GetShortenedUrlService,
    private readonly updateShortenedUrlService: UpdateShortenedUrlService,
    private readonly deleteShortenedUrlService: DeleteShortenedUrlService,
    private readonly listShortenedUrlService: ListShortenedUrlService,
  ) {}

  @UseGuards(AuthGuard)
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
    @Req() req: Request,
  ): Promise<ICreateShortenedUrlResponseDoc> {
    const dataParsed = await CreateShortenedUrlSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    const user = req.headers ? req['user'] : null;

    const shortenedUrl = await this.createShortenedUrlService.execute({
      user,
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

  @UseGuards(AuthGuard, ShortenedUrlsGuard)
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

  @UseGuards(AuthGuard, ShortenedUrlsGuard)
  @ApiOperation({ summary: 'Delete shortenedUrl by id' })
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

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List Shortened Urls ' })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: IListShortenedUrlDoc,
  })
  @ApiResponse({
    description: 'Shortened Urls',
    type: IListShortenedUrlResponseDoc,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'Unauthorized',
    status: HttpStatus.UNAUTHORIZED,
  })
  @Post('/list')
  public async list(
    @Body() data: IListShortenedUrlDoc,
    @Req() req: Request,
  ): Promise<IListShortenedUrlResponseDoc> {
    const dataParsed = await ListShortenedUrlSchema.parseAsync(data).catch(
      (error) => {
        throw new ValidationError(error);
      },
    );

    const user = req.headers ? req['user'] : null;

    const shortenedUrls = await this.listShortenedUrlService.execute({
      user,
      data: dataParsed,
    });

    return instanceToInstance(shortenedUrls);
  }
}

export default ShortenedUrlsController;
