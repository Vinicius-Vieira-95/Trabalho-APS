export enum ROLES {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  COORDINATOR = 'COORDINATOR',
}

export type RoleType = keyof typeof ROLES;
