import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log(`MongoDB connected !`)
        })
        connection.on('error', (error) => {
            console.log(`MongoDB connected error : ${error}`)
        })
    } catch (error) {
        throw new Error(`MongoDB connection error: ${error}`)
    }
}