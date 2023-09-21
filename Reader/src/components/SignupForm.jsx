import React, {useState} from "react";
import NavLine from "../components/NavLine";
import { Input } from "@material-tailwind/react";
import RadioButton from "../components/RadioButton";
import CustomButton from "../components/CustomButton";

const SignupForm = () => {
  const [account, setAccount] = useState({username: '', password: '', name: '', id: '', birth: '', sex: '', email: '', address: ''});
  const handleSignup = (e) => {
    e.preventDefault();
    // console.log("Sign up");
    console.log(account);
  }
  return (
    <form
      className="flex flex-col items-center gap-8 w-full"
      onSubmit={(e) => handleSignup(e)}
    >
      <NavLine element="Sign Up" />
      <div className="w-full grid grid-cols-2 gap-3">
        <Input
          label="Username"
          required
          onChange={(e) =>
            setAccount((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <Input
          label="Password"
          type="password"
          required
          onChange={(e) =>
            setAccount((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Input
          label="Name"
          required
          onChange={(e) =>
            setAccount((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <Input
          label="ID number"
          required
          onChange={(e) =>
            setAccount((prev) => ({ ...prev, id: e.target.value }))
          }
          onInput={(e) => e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
          pattern=".{12}"
        />
        <Input
          label="Birthdate"
          type="date"
          required
          onChange={(e) =>
            setAccount((prev) => ({ ...prev, birth: e.target.value }))
          }
        />
        <div className="flex gap-4">
          <RadioButton label="Male" defaultChecked={true} />
          <RadioButton label="Female" />
        </div>
        <Input
          label="Email"
          type="email"
          required
          onChange={(e) =>
            setAccount((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <Input
          label="Address"
          required
          onChange={(e) =>
            setAccount((prev) => ({ ...prev, address: e.target.value }))
          }
        />
      </div>
      <CustomButton label="Sign Up" type="submit" />
    </form>
  );
};

export default SignupForm;
