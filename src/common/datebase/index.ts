import { ConfigService } from '@nestjs/config';

import { config } from 'dotenv';

import { DataSource } from 'typeorm';

import Entities from './entities';

config();

const configService = new ConfigService();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        logging: false,
        entities: Entities,
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
