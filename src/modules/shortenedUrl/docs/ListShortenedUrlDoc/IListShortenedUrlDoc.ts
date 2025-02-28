import { ApiProperty } from '@nestjs/swagger';

class IListShortenedUrlDoc {
  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}

export default IListShortenedUrlDoc;
