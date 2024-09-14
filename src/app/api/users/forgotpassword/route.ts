import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";

connectDB()

export const POST = async (request: NextRequest) => {
    try {
        const { email } = await request.json();
        const user = await User.findOne({ email })
        console.log(user)

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        } 

        sendEmail({email, emailType:"RESET", userId: user._id})

        return NextResponse.json({message:"user found", user}, {status: 200})
    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}