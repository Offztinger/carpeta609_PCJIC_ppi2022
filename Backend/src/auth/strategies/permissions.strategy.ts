import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Injectable()
export class PermissionsStrategy {
    constructor(private prisma: PrismaService) { }

    async getPermissions(idParam: string | undefined) {
        const user = await this.prisma.user.findUnique({ where: { id: idParam } });

        if (!user) {
            throw new UnauthorizedException();
        }

        const role = await this.prisma.roles.findUnique({ where: { id: user.idRole } });
        const form = await this.prisma.form.findMany();
        const permissions = (await this.prisma.permissions.findMany({ where: { idRole: user.idRole } })).map((permission) => {
            const route = form.find((form) => form.idForm === permission.idFormPermission);
            return {
                route: route?.route,
                role: role?.roleName,
                create: permission.create,
                read: permission.read,
                update: permission.update,
                delete: permission.delete,
            };
        });

        return permissions;
    }
}