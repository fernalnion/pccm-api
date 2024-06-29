import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUser } from 'src/interfaces/IUser';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends UpdateUserDto implements IUser {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  firstname: string;

  @ApiPropertyOptional({ type: String })
  lastname?: string;

  @ApiProperty({ type: String })
  role: string;
}
