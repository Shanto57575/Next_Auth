import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDB } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";

connectDB()

export const POST = async (request: NextRequest) => {
    try {
        const { username, email, password } = await request.json();
        console.log(username, email, password)

        if (!username || !email || !password) {
            return NextResponse.json({error: "All fields are required"}, {status: 400})
        }

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({error: "user already exists"}, {status: 400})
        }

        console.log("user", user)
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        savedUser.password = undefined

        sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        
        return NextResponse.json({
            message: "user registered successfully",
            success: true,
            savedUser
        }, { status: 200 })

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}