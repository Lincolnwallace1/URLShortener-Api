import { ApiProperty } from '@nestjs/swagger';

class MetaData {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}

class ShortenedResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  originalUrl: string;

  @ApiProperty()
  shortenedUrl: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  dateDeletion?: Date;

  @ApiProperty()
  clickCount: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;
}

class Records {
  @ApiProperty({ type: [ShortenedResponse] })
  shortenedUrls: ShortenedResponse;
}

class IListShortenedUrlResponseDoc {
  @ApiProperty({ type: MetaData })
  metaData: MetaData;

  @ApiProperty({ type: Records })
  records: Records[];
}

export default IListShortenedUrlResponseDoc;
