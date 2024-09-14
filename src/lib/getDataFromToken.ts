import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';

        const decodedData:any = jwt.verify(token, process.env.TOKEN_SECRET!)
        
        return decodedData.userId
    } catch (error:any) {
        console.log(error.message)
    }
}