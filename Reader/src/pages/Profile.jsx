import React, {useState} from "react";
import { BiUserCircle } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { Input } from "@material-tailwind/react";
import { FaInfoCircle } from "react-icons/fa";
import RadioButton from "../components/RadioButton";
import CustomButton from "../components/CustomButton";
import { useSelector, useDispatch } from 'react-redux'
import {updateInfo} from "../slices/requestApi"
// const user =
// {
//   "_id": "651f7e12d0aeecf563a5617a",
//   "username": "vann26",
//   "password": "$2b$10$Z5QKriVZ4QFD.Kda5t9dN.GnqglygkO7sccm7xq4LeAHEaxxRwW3C",
//   "admin": false,
//   "name": "Trần Thị Thanh Vân",
//   "id": "123456789012",
//   "birthday": "2003-01-01T00:00:00.000Z",
//   "sex": "Female",
//   "email": "van@gmail.com",
//   "address": "123 Vườn Lài",
//   "makingDay": "2023-10-06T03:25:06.003Z",
//   "invalidDay": "2025-10-05T17:00:00.000Z",
//   "__v": 0,
//   "photo": "",
// }

const Profile = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const [account, setAccount] = useState(user);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateInfo(dispatch, account?._id, account?.accessToken, account);
  }

  const changePhoto = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
  }

  return (
    <div className="w-full flex gap-8 pt-12 pb-2 pr-4 pl-3">
      <div className="relative w-32 h-32 shrink-0">
        {!user.photo ? (
          <BiUserCircle className="w-full h-full" />
        ) : (
          <img
            src={user.photo}
            alt="upload"
            className="object-cover w-full h-full rounded-full"
          />
        )}
        <div
          className="absolute bottom-3 right-6 w-6 h-6 rounded-full bg-red flex items-center justify-center"
        >
          <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={changePhoto} />
          <MdEdit className="text-white text-center hover:cursor-pointer" onClick={() => document.querySelector('input[type="file"]').click()} />
        </div>
      </div>
      <form className='w-full space-y-6' onSubmit={handleUpdateProfile}>
        <h1 className='text-2xl font-semibold text-center'>PROFILE</h1>
        <div className='w-full grid grid-cols-2 gap-4'>
        <div className='col-span-2'>
            <Input
              variant="standard"
              label="Username"
              required
              minLength={6}
              maxLength={20}
              name="username"
              value={account.username}
              onChange={handleChangeInfo}
              readOnly
            />
            <p className="mt-2 flex items-center gap-2 font-normal text-[0.75rem]">
              <FaInfoCircle className='w-3.5 h-3.5' />
              Use 6-20 characters.
            </p>
          </div>
          <Input
            variant="standard"
            label="Name"
            required
            onChange={handleChangeInfo}
            name="name"
            value={account.name}
          />
          <Input
            variant="standard"
            label="ID number"
            required
            onInput={(e) =>
              (e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1"))
            }
            pattern=".{12}"
            maxLength={12}
            onChange={handleChangeInfo}
            name="id"
            value={account.id}
          />
          <Input
            variant="standard"
            label="Birthdate"
            required
            type="date"
            onChange={handleChangeInfo}
            name="birthday"
            value={account.birthday === '' ? '' : new Date(account.birthday).toISOString().slice(0, 10)}
          />
          <div className="flex gap-4 self-end"> 
            <RadioButton
              label="Male"
              onChange={handleChangeInfo}
              value="Male"
              name="sex"
              checked={account.sex === "Male"}
            />
            <RadioButton
              label="Female"
              onChange={handleChangeInfo}
              value="Female"
              name="sex"
              checked={account.sex === "Female"}
            />
          </div>
          <Input
            variant="standard"
            label="Email"
            required
            type="email"
            onChange={handleChangeInfo}
            value={account.email}
            name="email"
          />
          <Input
            variant="standard"
            label="Address"
            required
            onChange={handleChangeInfo}
            value={account.address}
            name="address"
          />
          <Input
            variant="standard"
            label="Registration date"
            readOnly
            value={formatDate(account.makingDay)}
            name="makingDay"
            labelProps={{ className: "peer-disabled:text-textDisable" }}
          />
          <Input
            variant="standard"
            label="Expiration date"
            readOnly
            value={formatDate(account.invalidDay)}
            name="invalidDay"
            labelProps={{ className: "peer-disabled:text-textDisable" }}
          />
        </div>
        <div className="flex justify-center pt-3">
          <CustomButton label="Save changes" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Profile;