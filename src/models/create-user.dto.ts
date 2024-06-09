import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/interfaces/IUser';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends UpdateUserDto implements IUser {
  @ApiProperty({ type: String })
  password: string;
}
