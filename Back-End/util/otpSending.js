import dotenv from "dotenv";
dotenv.config();
import nodemailer from 'nodemailer'

export const otpSend = (email, otp) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(" NodeMailer generation processing Please Wait", email, otp);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'chithuworks@gmail.com', // Your Gmail email address
                    pass: process.env.NODEMAILER_PASSWORD, // Your Gmail password or an App Password
                },
            });

            let message = {
                from: ' <chithuworks@gmail.com>', // Sender's email address
                to: email, // Receiver's email address
                subject: 'Blog App User Email Verification',
                html: `<h3>Your OTP is <span> <h1>${otp}</h1></span></h3>`,
            };

            const info = await transporter.sendMail(message);
            console.log(`message Sent Successfully to ${email}`,); //MESSAGE SEND TO USER EMAIL SUCCESSFULLY
            resolve({ mailSend: true })

        } catch (error) {
            console.error("ERROR FROM [otpSend]", error);
            reject(error)
        }
    })
}
