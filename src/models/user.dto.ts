import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/interfaces/IUser';

export class updateDto {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  firstname: string;

  @ApiProperty({ type: String })
  lastname?: string;

  @ApiProperty({ type: String })
  role: string | any;
}

export class CreateUserDto extends updateDto implements IUser {
  @ApiProperty({ type: String })
  password: string;
}
