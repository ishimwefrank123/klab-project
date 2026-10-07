// import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//     service: "gmail",
//     port: 587,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//     }


// }) 


import { BrevoClient } from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

export const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY!,
});
