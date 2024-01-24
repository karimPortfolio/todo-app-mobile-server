import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service:'gmail',
    host:'',
    port:465,
    secure:true,
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASSWORD,
    }
});
