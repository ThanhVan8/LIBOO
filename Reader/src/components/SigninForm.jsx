import React, { useState } from "react";
import NavLine from "../components/NavLine";
import { Input } from "@material-tailwind/react";
import CustomButton from "../components/CustomButton";
import { FaRegUser, FaLock } from "react-icons/fa6";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    // console.log("Sign in");
  }
  return (
    <form className="flex flex-col items-center gap-8 w-full" onSubmit={(e) => handleSignin(e)}>
      <NavLine element="Sign In" />
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
  );
};

export default SigninForm;