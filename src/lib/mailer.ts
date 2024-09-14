import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs";
import User from '@/models/user.model';

interface verifyUser{
    email: string,
    emailType: string,
    userId: string
}

export const sendEmail = async ({ email, emailType, userId }: verifyUser) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgetPasswordToken: hashedToken,
                    forgetPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.auth_user,
              pass: process.env.auth_pass,
            }
        });

        const mailOptions = {
            from: "shan@shanto.ai",
            to: email,
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Reset Your Password",
            html: emailType === 'VERIFY' ?`
                <p>
                    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Click Here</a> to Verify your Email
                </p>
                or
                Copy and paste the below link in your browser:
                <br/>
                ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            `:`
                <p>
                    <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">Click Here</a> to Reset Your Password
                </p>
                or
                Copy and paste the below link in your browser:
                <br/>
                ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
            `
        }
        

        const response = await transporter.sendMail(mailOptions)

        return response
          
    } catch (error) {
        throw new Error(`Error sending email`)
    }
}