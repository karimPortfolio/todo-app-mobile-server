import { prisma } from "../config/prisma.js";


export const storeToken = async (token, userId, expiresTime) => {
    try
    {
        const new_token = await prisma.password_reset_tokens.create({
            data:{
                userId,
                token,
                expiration_time:expiresTime
            }
        })
        return new_token;
    }
    catch (err)
    {
        console.log(err);
    }
    finally
    {
        prisma.$disconnect
    }
}

export const getToken = async (token) => {
    try
    {
        const result = await prisma.password_reset_tokens.findFirst({
            where:{
                token:token
            }
        });
        return result;
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

export const deleteToken = async (id) => {
    try
    {
        await prisma.password_reset_tokens.delete({
            where:{
                id:id
            }
        });
    }
    catch (err)
    {
        console.log(err);
    }
    finally
    {
        prisma.$disconnect;
    }
}

