'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Loader from "../components/Loader"

const Profile = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>("nouser");
  const [loading, setLoading] = useState(false)

  const userData = async () => {
    try {
      const response = await axios.get('/api/users/profile')
      console.log(response.data.user)
      setUser(response.data.user)
    } catch (error:any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    userData()
  }, [])

  const handleLogout = async() => {
    try {
      setLoading(true)
      const res = await axios.post('/api/users/logout')
      if (res) {
        toast.success(<h1 className="font-serif">logout successfull</h1>)
        setLoading(false)
        setTimeout(() => {
          router.push('/login')
        },1000)
      }
    } catch (error: any) {
      setLoading(false)
      console.log(error.message)
    }
  }
  
  return (
      <div className="h-[500px] flex flex-col items-center justify-center">
          <h1 className="text-2xl mb-5">Profile</h1>
      <div className="text-center">
        {
          user ==='nouser'? <Loader/> : 
             <><h1>UserId : { user._id}</h1>
             <h1>Username : { user.username}</h1>
             <h1>Email : { user.email}</h1></>
        }
      </div>
      <button onClick={handleLogout} className="border w-64 mt-3 rounded py-2 hover:bg-zinc-700" type="submit">{loading ? <Loader/> : "Logout"}</button>
    </div>
  )
}

export default Profile
