import { prisma } from "../config/prisma.js"

export const createUser = async (name, email, hashedPassword) => {

    try
    {
        const new_user = await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:hashedPassword,
            }
        });
        return new_user;
    }
    catch(err)
    {
        console.log(err);
    }
    finally
    {
        prisma.$disconnect;
    }
}

export const getUserByEmail = async (email) => {

    try
    {
        const user = await prisma.user.findUnique({where:{email:email}});
        return user;
    }
    catch(err)
    {
        console.log(err);
    }
    finally
    {
        prisma.$disconnect;
    }
}

