import { ApiProperty } from '@nestjs/swagger';

class ICreateUserResponseDoc {
  @ApiProperty()
  id: number;
}

export default ICreateUserResponseDoc;
