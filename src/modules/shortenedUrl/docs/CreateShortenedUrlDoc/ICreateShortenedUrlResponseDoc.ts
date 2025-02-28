import { ApiProperty } from '@nestjs/swagger';

class ICreateShortenedUrlResponseDoc {
  @ApiProperty()
  id: number;

  @ApiProperty()
  shortenedUrl: string;
}

export default ICreateShortenedUrlResponseDoc;
