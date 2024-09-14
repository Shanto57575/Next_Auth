import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getDataFromToken } from "@/lib/getDataFromToken";

connectDB()

export const GET = async (request: NextRequest) => {
    try {
        const userId = getDataFromToken(request)!;
        const user = await User.findOne({ _id: userId }).select('-password')

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        return NextResponse.json({message:"user found", user}, {status: 200})
    } catch (error : any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}