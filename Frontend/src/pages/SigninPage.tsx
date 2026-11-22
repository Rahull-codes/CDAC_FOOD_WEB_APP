import  { useContext, useState } from "react";
import { userSignin } from "../services/UserService";
import { toast } from "react-toastify";
import type { AxiosResponse } from "axios";
import type { APIresponse } from "../types/Api";
import type { UserSignin } from "../types/User";
import { useNavigate } from "react-router";
import { LoggedInUserStatusContext } from "../App";
import { Config } from "../utils/config";

function SigninPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const { loggedInUserStatus ,setLoggedInUserStatus } = useContext(LoggedInUserStatusContext)!

   const  handleSigninClick = async () => {
    try{
        const response: AxiosResponse<APIresponse<UserSignin>> = await userSignin(email , password) 
        const result : APIresponse<UserSignin> = response.data

        if(result.status == 'success'){
            setLoggedInUserStatus(true)
            console.log(loggedInUserStatus)
            console.log(result)
            toast.success("Login successfull" )
            window.sessionStorage.setItem( Config.TOKEN , result.data.token)
            navigate('/home')
        }else{
            console.log("invalid")
            toast.error("Invalid Email or Password")
          }
          setEmail('')
          setPassword('')
    }catch(error){
        toast.error("Invalid Email or Password")
        setEmail('') 
        setPassword('')
    }
   }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[27%] mx-auto bg-gray-600 p-2 align-middle">
        <div className=" text-2xl flex justify-center font-semibold">
          Welcome Back Login!!
        </div>
        <div className="m-2 ">
          <h3 className="mx-1">Email:</h3>
          <input
          value={email}
          onChange={e => {setEmail(e.target.value)}}
            type="email"
            className="input input-neutral w-full "
            placeholder="xyz@gmial"
            required
          />
        </div>
        <div className="m-2 ">
          <h3 className="mx-1">Password:</h3>
          <input
          value={password}
          onChange={e => {setPassword(e.target.value)}}
            type="password"
            className="input input-neutral w-full"
            placeholder="********"
            required
          />
        </div>
        <div className=" mt-4 m-2">
          <button className="btn btn-active w-full  " onClick={handleSigninClick}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
