import { ApiProperty } from '@nestjs/swagger';
import { IRole } from 'src/interfaces/IRole';

export class CreateRoleDto implements IRole {
  @ApiProperty({ type: String })
  readonly name: string;

  @ApiProperty({ type: String })
  readonly description: string;
}
