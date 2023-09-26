import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import CustomButton from "../components/CustomButton";
import { FaRegUser, FaLock } from "react-icons/fa6";

const SigninForm = () => {
  const [account, setAccount] = useState({username: '', password: ''});

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
  }

  const handleSignin = (e) => {
    e.preventDefault();
    // console.log(account);
  }
  return (
    <form className="flex flex-col items-center gap-8 w-full" onSubmit={(e) => handleSignin(e)}>
      <div className="w-full flex flex-col gap-3">
        <Input 
          icon={<FaRegUser />} 
          label="Username"
          onChange={handleChangeInfo}
          required
          name="username"
          value={account.username}
        />
        <Input 
          icon={<FaLock />} 
          label="Password"
          type="password"
          onChange={handleChangeInfo}
          required
          name="password"
          value={account.password}
        />
      </div>
      <CustomButton label="Sign In" type='submit' />
    </form>
  );
};

export default SigninForm;