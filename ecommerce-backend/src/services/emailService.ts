import { brevo } from "../config/mail";
import { welcomeEmailTemplate } from "../templates/welcome.template";

const sendEmail = async (
    to: string,
    subject: string,
    html: string
) => {
    try {
        await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                email: process.env.BREVO_SENDER_EMAIL!,
                name: process.env.BREVO_SENDER_NAME || "klab",
            },

            to: [
                {
                    email: to,
                },
            ],

            subject,
            htmlContent: html,
        });

        console.log(`Email sent successfully to ${to}`);

    } catch (error) {
        console.error("Error sending email:", error);
    }
};


export const sendResetCodeEmail = async (
    to: string,
    code: string
) => {
    const subject = "Password Reset Code";

    const html = `
        <p>Hello,</p>

        <p>
            Here is your password reset OTP:
            <strong>${code}</strong>
        </p>

        <p>
            This code will expire in 10 minutes.
        </p>
    `;

    await sendEmail(to, subject, html);
};


export const sendWelcomeEmail = async (
    to: string,
    name: string
) => {
    const subject = "Welcome to Node Auth App";

    const html = welcomeEmailTemplate(name);

    await sendEmail(to, subject, html);
};