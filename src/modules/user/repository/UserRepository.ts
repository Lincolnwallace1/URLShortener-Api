import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import User from '@entities/User';

import { ICreateUserDTO, IUpdateUserDTO } from '@modules/user/dtos';

@Injectable()
class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(data: ICreateUserDTO): Promise<User> {
    return await this.userRepository.save(data);
  }

  public async update(id: number, data: IUpdateUserDTO): Promise<void> {
    await this.userRepository.update(id, {
      ...data,
    });
  }

  public async get(
    where: object | object[],
    relations?: string[],
  ): Promise<User | null> {
    return await this.userRepository.findOne({
      where,
      relations,
    });
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<[User[], number]> {
    return this.userRepository.findAndCount({
      where,
      relations,
      take,
      skip,
    });
  }
}

export default UserRepository;
