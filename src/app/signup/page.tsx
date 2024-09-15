'use client'
import Link from "next/link"
import { useState } from "react"
import Loader from "../components/Loader"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

const SignUp = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password:""
  })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    
    const handleSubmit = async(e : any) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('/api/users/signup', user);
            setLoading(false)
            setSuccess(true)
            setUser({
                username: "",
                email: "",
                password:""
            })
            if (response) { 
                toast.success(<h1 className="font-serif">{response.data.message}</h1>)
            }
        } catch (error : any) {
            console.log(error.message)
            setLoading(false)
            toast.error(<h1 className="font-serif">Signup Failed</h1>)
        }
    }

  return (
      <div className="h-[500px] flex flex-col items-center justify-center">
          <Toaster />
          {
              success ? <h1 className="text-3xl font-serif text-blue-500">Please check your Email to verify</h1> :
            <>
            <h1 className="text-2xl mb-5">Sign Up</h1>
            <form onSubmit={handleSubmit} className="w-60 md:w-96 space-y-2 bg-zinc-900 rounded-xl p-6 md:p-10 mx-3 md:mx-0">
              <div>
                  <label htmlFor="username">Username</label> <br />
                  <input
                      required
                      onChange={(e)=>setUser({...user, username : e.target.value})}
                      className="w-full mt-1 p-2 bg-zinc-700 border border-gray-700 rounded"
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username" />
              </div>
              <div>
                  <label htmlFor="email">Email</label> <br />
                  <input
                      required
                      onChange={(e)=>setUser({...user, email : e.target.value})}
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
                      onChange={(e)=>setUser({...user, password : e.target.value})}
                      className="w-full mt-1 p-2 mb-2 bg-zinc-700 border border-gray-700 rounded"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password" />
              </div>
              <button disabled={loading} className="border w-full rounded py-2 hover:bg-zinc-700" type="submit">{ loading ? <Loader /> : "Sign up"}</button>
              <p className="mt-1 text-sm text-center">Already have an account ? <Link className="hover:underline text-blue-500" href='/login'>Login</Link> </p>
            </form>
            </>
          }
    </div>
  )
}

export default SignUp
