import {transporter} from "../config/mail";
import {welcomeEmailTemplate} from "../templates/welcome.template";

const sendEmail = async (to: string, subject: string, html: string)=>{
    try{
        await transporter.sendMail({
            from: `"klab" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        })

    }catch(error){
        console.error("Error sending email: \n", error)
    }
}


export const sendResetCodeEmail = async (to: string, code: string ) => {
    const subject = "Password Reset Code";
    const html = `
    <p>Hello,</p>
    <p>Here is your password reset OTP: ${code}</p>
    <p>This code will expire in 10 minutes</p>
    `
    await sendEmail(to, subject, html);
}

export const sendWelcomeEmail = async (to:string, name:string) => {
    const subject = "Welcome to Node Auth App";
    const html = welcomeEmailTemplate(name);
    await sendEmail(to, subject, html);
}