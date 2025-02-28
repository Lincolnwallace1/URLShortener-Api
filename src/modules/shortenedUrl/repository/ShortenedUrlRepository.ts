import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import ShortenedUrls from '@entities/ShortenedUrls';

import {
  ICreateShortenedUrlDTO,
  IUpdateShortenedUrlDTO,
} from '@modules/shortenedUrl/dtos';

@Injectable()
class ShortenedUrlRepository {
  constructor(
    @Inject('SHORTENEDURL_REPOSITORY')
    private readonly shortenedUrlRepository: Repository<ShortenedUrls>,
  ) {}

  public async create(data: ICreateShortenedUrlDTO): Promise<ShortenedUrls> {
    return await this.shortenedUrlRepository.save(data);
  }

  public async update(id: number, data: IUpdateShortenedUrlDTO): Promise<void> {
    await this.shortenedUrlRepository.update(id, {
      ...data,
    });
  }

  public async get(
    where: object | object[],
    relations?: string[],
  ): Promise<ShortenedUrls | null> {
    return await this.shortenedUrlRepository.findOne({
      where,
      relations,
    });
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<[ShortenedUrls[], number]> {
    return this.shortenedUrlRepository.findAndCount({
      where,
      relations,
      take,
      skip,
    });
  }
}

export default ShortenedUrlRepository;
