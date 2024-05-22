import { PrismaClient } from "@prisma/client";
import rolesSeed from "./data/roles";
import formsSeed from "./data/forms";
import { studentPermissions, professorPermissions, adminPermissions } from "./data/permissions";
import coursesSeed from "./data/courses";
const prisma = new PrismaClient();

async function main() {
    // Semilla de roles
    for (const role of rolesSeed) {
        await prisma.roles.create({
            data: {
                id: role.id,
                roleName: role.roleName,
                roleDescription: role.roleDescription,
            },
        });
    }

    // Semilla de formularios
    for (const form of formsSeed) {
        await prisma.form.create({
            data: {
                idForm: form.idForm,
                formName: form.formName,
                formDescription: form.formDescription,
                route: form.route,
            },
        });
    }

    // Semilla de permisos de estudiantes
    for (const permission of studentPermissions) {
        await prisma.permissions.create({
            data: {
                idFormPermission: permission.idFormPermission,
                create: permission.create,
                update: permission.update,
                read: permission.read,
                delete: permission.delete,
                idRole: permission.idRole,
            },
        });
    }
    
    // Semilla de permisos de profesores
    for (const permission of professorPermissions) {
        await prisma.permissions.create({
            data: {
                idFormPermission: permission.idFormPermission,
                create: permission.create,
                update: permission.update,
                read: permission.read,
                delete: permission.delete,
                idRole: permission.idRole,
            },
        });
    }

    // Semilla de permisos de coordinadores
    for (const permission of adminPermissions) {
        await prisma.permissions.create({
            data: {
                idFormPermission: permission.idFormPermission,
                create: permission.create,
                update: permission.update,
                read: permission.read,
                delete: permission.delete,
                idRole: permission.idRole,
            },
        });
    }
    
    // Semilla de cursos
    for(const course of coursesSeed){
        await prisma.course.create({
            data: {
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                courseLevel: course.courseLevel,
                isAlternative: course.isAlternative,
            },
        });
    }
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });