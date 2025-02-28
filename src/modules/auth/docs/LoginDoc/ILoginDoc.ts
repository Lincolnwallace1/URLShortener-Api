import { ApiProperty } from '@nestjs/swagger';

class ILoginDoc {
  @ApiProperty({ example: 'jondue@gmail.com', required: true })
  email: string;

  @ApiProperty({ example: '123456', required: true })
  password: string;
}

export default ILoginDoc;
