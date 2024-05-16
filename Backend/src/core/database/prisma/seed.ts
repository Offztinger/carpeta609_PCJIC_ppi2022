import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.roles.create({
        data: {
            id: "3284495c-136e-4215-b8cc-30e6d9ca52b0",
            roleName: "Estudiante",
            roleDescription: "Estudiante",
        },
    });

    await prisma.roles.create({
        data: {
            id: "1164b212-c28e-4f5c-a886-36795031cbf3",
            roleName: "Profesor",
            roleDescription: "Profesor",
        },
    });

    await prisma.roles.create({
        data: {
            id: "248d3d75-8e44-4bc6-a0ca-e02bfaa2c0e4",
            roleName: "Asesor",
            roleDescription: "Asesor",
        },
    });

    await prisma.roles.create({
        data: {
            id: "c27a2360-6bd6-4939-b03c-98e09d25fece",
            roleName: "Coordinador",
            roleDescription: "Coordinador",
        },
    });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });