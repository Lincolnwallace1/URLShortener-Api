import { ApiProperty } from '@nestjs/swagger';

class ILoginResponseDoc {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expiresIn: number;
}

export default ILoginResponseDoc;
