import { SetMetadata } from '@nestjs/common';

import { Roles } from 'src/roles/constants/roles.constants';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...Roles: Roles[]) => SetMetadata(ROLES_KEY, Roles);
