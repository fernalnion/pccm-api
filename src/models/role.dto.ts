import { IRole } from 'src/interfaces/IRole';

export class CreateRoleDto implements IRole {
  readonly name: string;
  readonly description: string;
}
