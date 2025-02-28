import { DataSource } from 'typeorm';
import ShortenedUrls from '@entities/ShortenedUrls';

const ShortenedUrlProviders = [
  {
    provide: 'SHORTENEDURL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ShortenedUrls),
    inject: ['DATA_SOURCE'],
  },
];

export default ShortenedUrlProviders;
