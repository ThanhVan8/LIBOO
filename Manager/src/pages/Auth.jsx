import React, {useState} from 'react'
import logo from '../assets/logo.png'
import { Input } from "@material-tailwind/react";
import CustomButton from "../components/CustomButton";
import { FaRegUser, FaLock } from "react-icons/fa6";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    // console.log("Sign in");
    // console.log(username, password)
  }

  return (
    <div className='bg-lightOrange h-full bg-bg1 bg-right bg-contain bg-no-repeat'>
      <div className='min-w-[500px] w-full h-full bg-white flex flex-col items-center justify-center py-10 px-5 gap-20 md:w-1/2 md:rounded-r-[30px]'>
        <div className='flex items-center gap-5'>
          <div className='bg-red rounded-full w-fit h-fit p-2'>
            <img src={logo} alt='logo' className='w-[50px] h-auto'/>
          </div>
          <p className='font-semibold text-2xl'>Welcome to <span className='text-red'>LIBOO</span></p>
        </div>
        
        <form className="flex flex-col items-center gap-8 w-full" onSubmit={(e) => handleSignin(e)}>
          
          <div className="w-full flex flex-col gap-3">
            <Input 
              icon={<FaRegUser />} 
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input 
              icon={<FaLock />} 
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <CustomButton label="Sign In" type='submit' />
        </form>
      </div>
    </div>
  )
}
export default Auth