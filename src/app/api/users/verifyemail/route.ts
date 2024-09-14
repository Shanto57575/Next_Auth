import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";

connectDB()

export const POST = async (request: NextRequest) => {
    try {
        const { token } = await request.json();
        console.log(token)

        if (!token) {
            return NextResponse.json({error: "Invalid Token"}, {status: 400})
        }

        const user = await User.findOne({ verifyToken: token })
        
        if (!user) {
            return NextResponse.json({error: "Invalid or ExpiredToken"}, {status: 400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save();

        return NextResponse.json({
            message: "Email verification successfully",
            success: true,
        }, { status: 200 })

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}