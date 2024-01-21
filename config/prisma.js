import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient();

try
{
    prisma.$connect
}
catch (err)
{
    console.log(err);
}

