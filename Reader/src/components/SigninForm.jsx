import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import CustomButton from "../components/CustomButton";
import { FaRegUser, FaLock } from "react-icons/fa6";
import { loginUser } from "../slices/requestApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const [account, setAccount] = useState({username: '', password: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
    // console.log(account);
  }

  const handleSignin = (e) => {
    e.preventDefault();
    const newUser = {
      username: account.username,
      password: account.password,
    }
    console.log(newUser);
    loginUser(newUser, dispatch, navigate);
    
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