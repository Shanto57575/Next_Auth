import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDB } from "@/lib/db";
import jwt from 'jsonwebtoken'

connectDB()

export const POST = async (request: NextRequest) => {
    try {
        const { email, password } = await request.json();
        console.log(email, password)

        if (!email || !password) {
            return NextResponse.json({error: "All fields are required"}, {status: 400})
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({error: "user not found"}, {status: 404})
        }
        
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        
        if (!isPasswordValid) {
            return NextResponse.json({error: "Invalid Credentials"}, {status: 401})
        }
        
        const response = NextResponse.json({
            message: "user login successfully",
            success: true,
        }, { status: 200 })

        const token = jwt.sign({userId: user._id}, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
        
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response

    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}