import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User