import { ApiProperty } from '@nestjs/swagger';

class ICreateShortenedUrlDoc {
  @ApiProperty({
    example:
      'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
    required: true,
  })
  url: string;
}

export default ICreateShortenedUrlDoc;
