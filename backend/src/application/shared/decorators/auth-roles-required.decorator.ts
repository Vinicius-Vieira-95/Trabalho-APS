import { SetMetadata } from '@nestjs/common';
import { ROLES } from '@/domain/entities/enums/roles.enum';

export const RolesAllowed = (roles: ROLES[]) =>
  SetMetadata('rolesAllowed', roles);
