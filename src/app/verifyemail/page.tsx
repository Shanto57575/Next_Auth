'use client'

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyUserEmail = () => {
    const searchParams = useSearchParams();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const emailVerification = async () => {
            try {
                const token = searchParams.get('token');
                if (token) {
                    const response = await axios.post('/api/users/verifyemail', { token });
                    if (response) {
                        setVerified(true);
                    }
                }
            } catch (error: any) {
                console.log(error.message);
            }
        };

        emailVerification();
    }, [searchParams]);

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div>
                {verified ? (
                    <div className="text-center">
                        <h1 className="bg-green-900 text-green-200 text-lg rounded px-10 py-5">
                            Email Verification Successful
                        </h1>
                        <Link className="text-emerald-500 underline hover:text-emerald-400 text-xl mt-3" href='/login'>
                            Login Now
                        </Link>
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="bg-rose-600 text-rose-100 rounded px-10 py-5 text-lg">
                            Email Verification Failed
                        </h1>
                        <Link className="mt-4 text-blue-500 underline hover:text-blue-400 text-xl" href='/'>
                            Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VerifyUserEmail;
