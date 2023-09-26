import React, {useState} from "react";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setShowAddReader, setShowUpdateReader, setUpdatedReader } from '../slices/readerSlice';
import { BiUserCircle } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { Input } from "@material-tailwind/react";
import RadioButton from "./RadioButton";
import CustomButton from "./CustomButton";
import { FaInfoCircle } from "react-icons/fa";

const EXPIRATION = 2;

const ReaderForm = () => {
  const {showAddReader, showUpdateReader, updatedReader} = useSelector(state => state.reader);
  
  const today = new Date()
  const exp = new Date(today.getFullYear() + EXPIRATION, today.getMonth(), today.getDate()).toISOString().slice(0, 10);

  const [account, setAccount] = useState(
    !updatedReader ? 
    {...updatedReader, Sex: 'Male', RegDate: today.toISOString().slice(0, 10), ExpDate: exp}:
    updatedReader
  );

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
    
  }

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(account);
    closeForm();
  }

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-25 w-full h-full flex justify-center items-center z-50 overflow-auto ">
      <form
        className="relative bg-white drop-shadow-md p-5 w-full h-full md:w-[30rem] md:h-fit flex flex-col justify-center gap-4 rounded-lg"
        onSubmit={handleSubmit}
      >
        <button
          className="absolute top-3 right-3 w-6 h-6 bg-lightGrey rounded-full"
          onClick={closeForm}
        >
          <BiX size="1.5rem" />
        </button>
        <h1 className="text-2xl font-semibold text-left">{showAddReader ? 'Add' : 'Update'} Reader</h1>
        <div className="relative w-16 h-16">
          {!account.Photo ? 
          <BiUserCircle className='w-full h-full' /> :
          <img src={account.Photo} alt="upload" className="object-cover w-full h-full rounded-full" />
          }
          <button
            className="absolute bottom-2 right-1 w-5 h-5 rounded-full bg-red flex items-center justify-center"
            onClick={changePhoto}
          >
            <MdEdit className="text-white" />
          </button>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
          <Input
            variant="standard"
            label="RID"
            disabled
            name="RID"
            value={account.RID}
          />
          <div>
            <Input
              variant="standard"
              label="Username"
              required
              minLength={6}
              maxLength={20}
              onChange={handleChangeInfo}
              name="Username"
              value={account.Username}
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
            name="Name"
            value={account.Name}
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
            name="ID"
            value={account.ID}
          />
          <Input
            variant="standard"
            label="Birthdate"
            required
            type="date"
            onChange={handleChangeInfo}
            name="Birthdate"
            value={account.Birthdate}
          />
          <div className="flex gap-4 self-end">
            <RadioButton
              label="Male"
              onChange={handleChangeInfo}
              value="Male"
              name="Sex"
              checked={account.Sex === "Male"}
            />
            <RadioButton
              label="Female"
              onChange={handleChangeInfo}
              value="Female"
              name="Sex"
              checked={account.Sex === "Female"}
            />
          </div>
          <Input
            variant="standard"
            label="Email"
            required
            type="email"
            onChange={handleChangeInfo}
            value={account.Email}
            name="Email"
          />
          <Input
            variant="standard"
            label="Address"
            required
            onChange={handleChangeInfo}
            value={account.Address}
            name="Address"
          />
          <Input
            variant="standard"
            label="Registration date"
            disabled
            type="date"
            value={account.RegDate}
            name="RegDate"
            labelProps={{ className: "peer-disabled:text-textDisable" }}
          />
          <Input
            variant="standard"
            label="Expiration date"
            disabled
            type="date"
            value={account.ExpDate}
            name="ExpDate"
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
