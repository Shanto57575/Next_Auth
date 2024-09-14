'use client'
import axios from 'axios';
import React, { useState } from 'react'
import Loader from '../components/Loader';

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post('/api/users/forgotpassword', {email})
            console.log(response)
            setLoading(false)
            setSuccess(true)
        } catch (error:any) {
            console.log(error.message)
            setLoading(false)
        }
    }

  return (
    <div className="h-[500px] flex flex-col items-center justify-center">
          {
              success ? <h1 className='text-3xl text-blue-500'>Please check your Email</h1> :
            <>
          <h1 className='text-3xl mb-3'>Reset Password</h1>
          <form onSubmit={handleSubmit} className="w-60 md:w-96 space-y-2 bg-zinc-900 rounded-xl p-6 md:p-10 mx-3 md:mx-0">
                <label>Enter your email</label> <br />
                <input
                  className="w-full mt-1 p-2 mb-2 bg-zinc-700 border border-gray-700 rounded"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  name="email"
                  placeholder='Email'
                  id="email"
                />
                <button disabled={loading} type="submit" className='border px-3 py-2 w-full rounded hover:bg-zinc-800'>{ loading? <Loader/> :"Submit"}</button>
            </form>
            </>
          }
    </div>
  )
}

export default ResetPassword
