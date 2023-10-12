import React, {useEffect, useState} from "react";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setShowAddReader, setShowUpdateReader, setUpdatedReader } from '../slices/readerSlice';
import { BiUserCircle } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { Input } from "@material-tailwind/react";
import RadioButton from "./RadioButton";
import CustomButton from "./CustomButton";
import { FaInfoCircle } from "react-icons/fa";
import { addReader, updateReader, uploadImage } from "../slices/requestApi";

const EXPIRATION = 2;

const ReaderForm = () => {
  const {showAddReader, showUpdateReader, updatedReader} = useSelector(state => state.reader);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const doneAdd = useSelector((state) => state.reader.newReader?.success);
  const doneUpdate = useSelector((state) => state.reader.updatedReader?.success);

  const today = new Date()
  const exp = new Date(today.getFullYear() + EXPIRATION, today.getMonth(), today.getDate())

  const [account, setAccount] = useState(
    !updatedReader
      ? {
          // _id: "",
          username: "",
          name: "",
          id: "",
          birthday: "",
          sex: "Male",
          email: "",
          address: "",
          makingDay: today,
          invalidDay: exp,
          image: "",
        }
      : updatedReader
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const dispatch = useDispatch();

  const closeForm = () => {
    if (showAddReader) {
      dispatch(setShowAddReader());
    } else if (showUpdateReader) {
      dispatch(setShowUpdateReader());
      dispatch(setUpdatedReader(null));
    }
  }

  const changePhoto = (e) => {
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setAccount({...account, image: reader.result});
      if(showAddReader){
        addReader({...account, image: reader.result}, user?.accessToken, dispatch);
      }
      if(showUpdateReader){
        updateReader({...account, image: reader.result}, account._id, user?.accessToken, dispatch);
      }
      console.log(account.image);
    }
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(showAddReader){
      addReader(account, user?.accessToken, dispatch);
    }
    if(showUpdateReader){
      updateReader(account, account._id, user?.accessToken, dispatch);
    }
    if(doneAdd || doneUpdate)
      closeForm();
  }

  // useEffect(() => {

  // })

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-25 w-full h-full flex justify-center items-center z-50 overflow-auto ">
      <form
        className="relative bg-white drop-shadow-md p-5 w-full h-full md:w-[30rem] md:h-fit flex flex-col justify-center gap-4 rounded-lg"
        onSubmit={(e) => handleSubmit(e)}
      >
        <button
          className="absolute top-3 right-3 w-6 h-6 bg-lightGrey rounded-full"
          onClick={closeForm}
        >
          <BiX size="1.5rem" />
        </button>
        <h1 className="text-2xl font-semibold text-left">{showAddReader ? 'Add' : 'Update'} Reader</h1>
        {showUpdateReader &&
          <div className="relative w-16 h-16">
            {!account.image ? 
            <BiUserCircle className='w-full h-full' /> :
            <img src={account?.image} alt="upload" className="object-cover w-full h-full rounded-full" />
            }
            <div
              className="absolute bottom-1 -right-0.5 w-5 h-5 rounded-full bg-red flex items-center justify-center"
            >
              <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={changePhoto} />
              <MdEdit className="text-white hover:cursor-pointer" onClick={() => document.querySelector('input[type="file"]').click()} />
            </div>
          </div>
        }
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
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
              readOnly={showUpdateReader}
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

export default ReaderForm;
