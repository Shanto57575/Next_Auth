import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";

connectDB()

export const POST = async (request: NextRequest) => {
    try {
        const { token, password } = await request.json();
        console.log(token, password)

        if (!token) {
            return NextResponse.json({error: "Invalid Token"}, {status: 400})
        }

        const user = await User.findOne({ forgetPasswordToken: token })
        console.log("Before change", user)
        
        if (!user) {
            return NextResponse.json({error: "Invalid or ExpiredToken"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
 
        user.password = hashedPassword
        user.forgetPasswordToken =  undefined
        user.forgetPasswordTokenExpiry = undefined
    
        await user.save();
        console.log("After change", user)

        return NextResponse.json({
            message: "Password Reset successfull",
            success: true,
        }, { status: 200 })

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}