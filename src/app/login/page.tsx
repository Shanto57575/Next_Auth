'use client'

import Link from "next/link";
import { useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface User {
    email: string;
    password: string;
}

const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/users/login', user);
            console.log(response);
            setLoading(false);
            setUser({
                email: "",
                password: ""
            });
            if (response) { 
                toast.success(<h1>{response.data.message}</h1>);
                setTimeout(() => {
                    router.push('/profile');
                }, 1000);
            }
        } catch (error: any) {
            console.log(error.response ? error.response.data : error.message);
            setLoading(false);
            toast.error(<h1 className="font-serif">Login Failed</h1>);
        }
    };

    return (
        <div className="h-[500px] flex flex-col items-center justify-center">
            <Toaster />
            <h1 className="text-2xl mb-5">Login</h1>
            <form onSubmit={handleSubmit} className="w-60 md:w-96 space-y-2 bg-zinc-900 rounded-xl p-6 md:p-10 mx-3 md:mx-0">
                <div>
                    <label htmlFor="email">Email</label> <br />
                    <input
                        required
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full mt-1 p-2 bg-zinc-700 border border-gray-700 rounded"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label> <br />
                    <input
                        required
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="w-full mt-1 p-2 mb-2 bg-zinc-700 border border-gray-700 rounded"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password" />
                </div>
                <p><Link className="hover:underline text-sm text-blue-500 underline hover:text-blue-600" href='/forgotpassword'>Forgot Password</Link></p>
                <button disabled={loading} className="border w-full rounded py-2 hover:bg-zinc-700" type="submit">
                    {loading ? <Loader /> : "Login"}
                </button>
                <p className="mt-1 text-sm text-center">Don't have an account? <Link className="hover:underline text-blue-500" href='/signup'>Sign up</Link></p>
            </form>
        </div>
    );
}

export default Login;
