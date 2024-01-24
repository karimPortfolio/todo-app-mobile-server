import { compare, hash } from "bcrypt";
import { prisma } from "../config/prisma.js"
import { createToken } from "../utils/jwt/jwt.js";
import { createUser, getUserByEmail, updateUserPassword } from "../db/user.js";
import { sendForgetPasswordMail } from "../mails/forgetPassword/forgetPassword.js";


export const signup = async (req, res) => {
    try
    {
        const {name, email ,password} = req.body;
        if (name === "" || email==="" || password === "") {
            return res.status(400).json({
                type:'failed',
                auth:'false',
                message:'All input fields required'
            })
        }
        const user = await getUserByEmail(email);
        if (user)
        {
            return res.status(409).json({
                type:'failed',
                auth:'false',
                message:'This email has been already taken'
            })
        }
        const hashedPassword = await hash(password, 10);
        const new_user = await createUser(name, email, hashedPassword);
        if (!new_user) 
        {
            return res.status(500).json({
                type:'failed',
                auth:'false',
                message:'Something went wrong while trying to signup.'
            });
        }
        const new_user_data = {
            id: new_user.id,
            name: new_user.name,
            email: new_user.email,
        };
        const token = await createToken(new_user_data);
        return res.status(200).json({
            type:'success',
            auth:'true',
            user: new_user_data,
            token:token
        });
    }
    catch (err)
    {
        console.log(err);
        return res.status(500).json({
            type:'failed',
            message:'Something went wrong. Try again later.'
        });
    }

}


export const signin = async (req, res) => {

    const {email, password} = req.body;

    if (email==="" || password === "") {
        return res.status(400).json({
            type:'failed',
            auth:'false',
            message:'All input fields required'
        })
    }

    try
    {
        const user = await getUserByEmail(email);
        if (!user)
        {
            return res.status(401).json({
                type:'failed',
                auth:'false',
                message:"Email or password doesn't matched."
            });
        }

        const isMatched = await compare(password, user.password);
        if (!isMatched)
        {
            return res.status(401).json({
                type:'failed',
                auth:'false',
                message:"Email or password doesn't matched."
            });
        }

        const token = await createToken(user);
        if (!token)
        {
            return res.status(401).json({
                type:'failed',
                auth:'false',
                message:"Aww! Something went wrong."
            });
        }

        const user_info = {
            id:user.id,
            name: user.name,
            email:user.email
        }

        return res.status(200).json({
            type:'success',
            auth:'true',
            user: user_info,
            token: token
        });

    }
    catch (err)
    {
        console.log(err);
    }

}


export const forgetPassword = async (req, res) => {
    const email = req.body.email;
    try
    {
        if (!email)
        {
            return res.status(400).json({
                type:'failed',
                message:'Please enter your email.'
            });
        }
        const user = await getUserByEmail(email);
        if (!user)
        {
            return res.status(400).json({
                type:'failed',
                message:"Email doesn't matched."
            });
        }
        const mail = await sendForgetPasswordMail(user.name, user.email);
        if (!mail || !mail.messageId)
        {
            return res.status(500).json({
                type:'failed',
                message:"Something went wrong. Try again later"
            });
        }

        return res.status(200).json({
            type:'success',
            message:'Reset password link has been sent to your email'
        })
    }
    catch (err)
    {
        console.log(err);
    }
}

export const resetPassword = async (req, res) => {

    const {password} = req.body;
    const id = req.params.id;

    try
    {
        const hashedPassword = await hash(password, 10);
        if (!hashedPassword)
        {
            return res.status(500).json({
                type:'failed',
                message:"Something went wrong."
            });
        }
        const updatedUser = await updateUserPassword(id, hashedPassword);
        if (!updatedUser)
        {
            return res.status(500).json({
                type:'failed',
                message:"Failed to reset password, Try again later."
            });
        }

        return res.status(200).json({
            type:'success',
            message:"Password changed with success."
        });
    }
    catch(err)
    {
        console.log(err);
    }
}

