"use client"
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Loader from "../components/Loader";

const VerifyUserEmail = () => {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  
  const resetUserPassword = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    try {
      setLoading(true);
      const token: string | null = searchParams.get('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const data = {
        token,
        password
      };

      const response = await axios.post('/api/users/resetpassword', data);
      if (response) { 
        setSuccess(true);
        setLoading(false);
      }
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        setErr(error.message);
      } else {
        setErr('An unknown error occurred');
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center font-serif">
      {success ? (
        <div>
          <h1 className="text-3xl text-center mb-2">Password Reset Successful</h1>
          <Link href="/login">
            <button className="border w-full rounded py-2 hover:bg-zinc-700">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-center my-2 text-2xl">Enter New Password</h1>
          <form onSubmit={resetUserPassword} className="border p-5 rounded">
            <label htmlFor="password">Password</label>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-3 mt-1 p-2 bg-zinc-700 border border-gray-700 rounded"
              type="password"
              name="password"
              id="password"
              placeholder="Enter new password"
            />
            <button
              disabled={loading}
              className="border w-full rounded py-2 hover:bg-zinc-700"
              type="submit"
            >
              {loading ? <Loader /> : "Set Password"}
            </button>
          </form>
        </>
      )}
      {err && <h1 className="text-red-600">Something went wrong: {err}</h1>}
    </div>
  );
};

export default VerifyUserEmail;
