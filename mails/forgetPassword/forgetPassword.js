import fs from 'fs';
import { transporter } from '../../config/mailTransporter.js';
import ejs from 'ejs';

export const sendForgetPasswordMail = async (name, email) => {
    const path = 'mails/forgetPassword/template/forgetPassword.ejs';
    
    try
    {
        const templateFile = fs.readFileSync(path, 'utf-8');
        const template = ejs.render(templateFile, {name: name});
        const mailOptions = {
            from: {
                name:'DailyTasks',
                address:process.env.GMAIL_USER
            },
            to: email,
            subject: "Reset your password",
            html: template,
        }
        const mail = await transporter.sendMail(mailOptions);
        return mail;
    }
    catch (err)
    {
        console.log(err);
    }

}
