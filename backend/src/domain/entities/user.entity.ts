import { RoleType } from '@/domain/entities/enums/roles.enum';
import BaseEntity from '@/domain/entities/base.entity';

export default class User extends BaseEntity {
  name: string;
  type: RoleType;
}
