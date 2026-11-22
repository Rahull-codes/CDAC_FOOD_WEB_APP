import { useEffect, useState } from 'react'
import { updateProfile, userProfile } from '../services/UserService'
import type { AxiosResponse } from 'axios'
import type { APIresponse } from '../types/Api'
import type { User } from '../types/User'
import { toast } from 'react-toastify'

const ProfilePage = () => {

    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [name, setName] = useState('')

    const getProfile = async ()=>  {
      try {
        const result : AxiosResponse<APIresponse<User>>= await userProfile()
        const user = result.data.data
        setEmail(user.email)
        setMobile(user.mobile)
        setName(user.name)
      } catch (error) {
        console.log(error)
      } 
    }

    const handleUpdate = async ()=>{
      try {
        const response:AxiosResponse<APIresponse<any>> = await updateProfile(mobile)
        const result = response.data
        if(result.status == 'success'){
          toast.success("Profile Updated")
        }else{
          toast.error('Update Failed , try again')
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
        getProfile()
    }, [])

  return (
        <>
    <div>

     <div className="min-h-screen flex items-center justify-center p-5 bg-[#1D232A]">

      <div className="card bg-base-100 w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="bg-primary h-32 rounded-t-2xl"></div>

        <div className="card-body items-center text-center -mt-20">

          {/* Avatar */}
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-4">
              <img
                src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                alt="Profile"
              />
            </div>
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold mt-3 capitalize">
            {name}
          </h2>

          <p className="text-sm text-base-content/60">
            My Profile
          </p>

          <div className="divider"></div>

          {/* Profile Details */}
          <div className="w-full space-y-4 text-left">

            <div className="flex items-center gap-4 bg-base-200 p-4 rounded-xl">
              <div className="text-primary text-xl">✉</div>
              <div>
                <p className="text-xs text-base-content/60">Email Address</p>
                <p className="font-semibold">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-base-200 p-4 rounded-xl">
              <div className="text-primary text-xl">☎</div>
              <div>
                <p className="text-xs text-base-content/60">Mobile Number</p>
                <input type="tel" value={mobile} onChange={e => {setMobile(e.target.value)}}  />
              </div>
            </div>

          </div>

          {/* Button */}
          <div className="card-actions w-full mt-6">
            <button className="btn btn-primary w-full " onClick={handleUpdate}>
              Update Profile
            </button>
          </div>

        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default ProfilePage
