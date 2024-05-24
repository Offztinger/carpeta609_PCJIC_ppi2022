import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Permission } from '../types';
import { ForbiddenException } from '../exception/ForbiddenException';


@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const permissionGuard = req.user.permissions.find((permission: Permission) =>
      req.url.startsWith(permission.route)
    );
    let hasPermission = false;
    switch (req.method) {
      case "POST":
        hasPermission = permissionGuard.create ? true : false;

        if (!hasPermission) {
          throw new ForbiddenException();
        }

        break;
      case "GET":
        hasPermission = permissionGuard.read ? true : false;

        if (!hasPermission) {
          throw new ForbiddenException();
        }

        break;
      case "PUT":
        hasPermission = permissionGuard.update ? true : false;

        if (!hasPermission) {
          throw new ForbiddenException();
        }

        break;
      case "DELETE":
        hasPermission = permissionGuard.delete ? true : false;

        if (!hasPermission) {
          throw new ForbiddenException();
        }

        break;

    }

    return hasPermission;
  }
}
