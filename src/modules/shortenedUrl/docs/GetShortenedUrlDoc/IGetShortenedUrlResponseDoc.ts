import { ApiProperty } from '@nestjs/swagger';

class IGetShortenedUrlResponseDoc {
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

export default IGetShortenedUrlResponseDoc;
