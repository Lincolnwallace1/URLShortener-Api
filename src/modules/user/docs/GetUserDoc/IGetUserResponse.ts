import { ApiProperty } from '@nestjs/swagger';

class IGetUserResponseDoc {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;
}

export default IGetUserResponseDoc;
