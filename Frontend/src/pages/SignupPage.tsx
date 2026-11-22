import { useState } from 'react'
import { userSignup } from '../services/UserService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

function SignupPage() {

   const [email, setEmail] = useState('') 
   const [name, setName] = useState('')
   const [password, setPassword] =useState('')
   const [mobile, setMobile] = useState('')
   const navigate = useNavigate()

    const handleSubmitSigniup = async( ) => {
      try{
        const response = await userSignup({email , name , password , mobile})
      const result = response.data
      if(result.status == "success"){
        toast.success("User created success")
        navigate('/')
        setEmail('')
        setMobile('')
        setName('')
        setPassword('')
      }else{
        toast.error("Something went wrong")
      }
      }catch(err){
        toast.error("Something went wrong")
        setEmail('')
        setMobile('')
        setName('')
        setPassword('')
      }
      
    }
   
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-[27%] mx-auto bg-gray-600 p-4 align-middle ">
        <div className=" text-2xl flex justify-center font-semibold">
          Register Now!!
        </div>
        <div className="m-2  ">
          <h3 className="mx-1">Username:</h3>
          <input
          value={name}
            onChange={e => {setName(e.target.value)}}
            type="text"
            className="input input-neutral w-full "
            placeholder="Full name"
          />
        </div>
        <div className="m-2 ">
          <h3 className="mx-1">Email:</h3>
          <input
          value={email}
          onChange={e => {setEmail(e.target.value)}}
            type="email"
            className="input input-neutral w-full "
            placeholder="xyz@gmial"
          />
        </div>
        <div className="m-2 ">
          <h3 className="mx-1">Password:</h3>
          <input
          value={password}
          onChange={e => {setPassword(e.target.value)}}
            type="passsword"
            className="input input-neutral w-full"
            placeholder="********"
          />
        </div>
        <div className="m-2 ">
          <h3 className="mx-1">Mobile:</h3>
          <input
          value={mobile}
            onChange={e => {setMobile(e.target.value)}}
            type="tel"
            className="input input-neutral w-full "
            placeholder="+91XXXXXXXXXXX"
          />
        </div>
        <div className=" mt-4 m-2">
          <button className="btn btn-active w-full "  onClick={handleSubmitSigniup} >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
