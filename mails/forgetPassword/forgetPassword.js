import fs from 'fs';
import { transporter } from '../../config/mailTransporter.js';
import ejs from 'ejs';

export const sendForgetPasswordMail = async (id, name, email, token, expiresTime) => {

    const path = 'mails/forgetPassword/template/forgetPassword.ejs';

    try
    {
        //read the mail template ejs file and render it with provided data
        const templateFile = fs.readFileSync(path, 'utf-8');
        const template = ejs.render(templateFile, {
            name: name,
            id: id,
            token: token,
            expiresTime: expiresTime
        });

        //set mail options to send in mail sending
        const mailOptions = {
            from: {
                name:'DailyTasks',
                address:process.env.GMAIL_USER
            },
            to: email,
            subject: "Reset your password",
            html: template,
        }

        //send mail and return the result
        const mail = await transporter.sendMail(mailOptions);
        return mail;
    }
    catch (err)
    {
        console.log(err);
    }

}
