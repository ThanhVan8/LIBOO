import React, {useState} from "react";
import { Input } from "@material-tailwind/react";
import RadioButton from "../components/RadioButton";
import CustomButton from "../components/CustomButton";
import { FaInfoCircle } from "react-icons/fa";
import { registerUser } from "../slices/requestApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [account, setAccount] = useState({username: '', password: '', name: '', id: '', birthdate: '', sex: 'Male', email: '', address: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
  }
  const handleSignup = (e) => {
    e.preventDefault();
    console.log(account);
    const newUser = {
      username: account.username,
      password: account.password,
      name: account.name,
      id: account.id,
      birthdate: account.birthdate,
      sex: account.sex,
      email: account.email,
      address: account.address
    };
    registerUser(newUser, dispatch, navigate);
  }

  return (
    <form
      className="flex flex-col items-center gap-8 w-full"
      onSubmit={(e) => handleSignup(e)}
    >
      <div className="w-full grid grid-cols-2 gap-3">
        <div>
          <Input
            label="Username"
            required
            onChange={handleChangeInfo}
            minLength={6}
            maxLength={20}
            name='username' 
            value={account.username}
          />
          <p className="mt-2 flex items-center gap-2 font-normal text-[0.75rem]">
            <FaInfoCircle className='w-3.5 h-3.5' />
            Use 6-20 characters.
          </p>
        </div>
        <Input
          label="Password"
          type="password"
          required
          onChange={handleChangeInfo}
          name='password' 
          value={account.password}
        />
        <Input
          label="Name"
          required
          onChange={handleChangeInfo}
          name='name' 
          value={account.name}
        />
        <Input
          label="ID number"
          required
          onChange={handleChangeInfo}
          onInput={(e) => e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
          pattern=".{12}"
          name='id' 
          value={account.id}
        />
        <Input
          label="Birthdate"
          type="date"
          required
          onChange={handleChangeInfo}
          name='birthdate' 
          value={account.birthdate}
        />
        <div className="flex gap-4">
          <RadioButton 
            label="Male" 
            value='Male'
            name='sex' 
            checked={account.sex === 'Male'}
            onChange={handleChangeInfo}
          />
          <RadioButton 
            label="Female"
            value='Female'
            name='sex' 
            checked={account.sex === 'Female'} 
            onChange={handleChangeInfo}
          />
        </div>
        <Input
          label="Email"
          type="email"
          required
          onChange={handleChangeInfo}
          name='email' 
          value={account.email}
        />
        <Input
          label="Address"
          required
          onChange={handleChangeInfo}
          name='address' 
          value={account.address}
        />
      </div>
      <CustomButton label="Sign Up" type="submit" />
    </form>
  );
};

export default SignupForm;