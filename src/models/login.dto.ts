import { ApiProperty } from '@nestjs/swagger';
import { ILogin } from 'src/interfaces/ILogin';

export class loginDto implements ILogin {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;
}
