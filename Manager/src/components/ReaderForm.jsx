import React, {useState} from "react";
import { BiX } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setShowAddReader, setShowUpdateReader } from '../slices/readerSlice';
import { BiUserCircle } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { Input } from "@material-tailwind/react";
import RadioButton from "./RadioButton";
import CustomButton from "./CustomButton";
import { FaInfoCircle } from "react-icons/fa";

const ReaderForm = (props) => {
  console.log(props)

  const today = new Date()
  const exp = new Date(today.getFullYear() + 2, today.getMonth(), today.getDate()).toISOString().slice(0, 10);
  
  const [account, setAccount] = useState(
    props == null ? 
    {photo: '', rid: '', username: '', name: '', id: '', birthdate: '', sex: '', email: '', address: '', regDate: today.toISOString().slice(0, 10), expDate: exp}:
    {photo: '', rid: props.RID, username: props.Username, name: props.Name, id: props.ID, birthdate: props.Birthdate, sex: props.Sex, email: props.Email, address: props.Address, regDate: props.RegDate, expDate: props.ExpDate}
  );
  const {showAddReader, showUpdateReader} = useSelector(state => state.reader);
  const dispatch = useDispatch();

  const closeForm = () => {
    if (showAddReader) {
      dispatch(setShowAddReader());
    } else if (showUpdateReader) {
      dispatch(setShowUpdateReader());
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

  const handleAdd = (e) => {
    e.preventDefault()
    console.log(account);
  }

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-25 w-full h-full flex justify-center items-center z-50 overflow-auto ">
      <form
        className="relative bg-white drop-shadow-md p-5 w-full h-full md:w-[30rem] md:h-fit flex flex-col justify-center gap-4 rounded-lg"
        onSubmit={handleAdd}
      >
        <button
          className="absolute top-3 right-3 w-6 h-6 bg-blue-gray-100 rounded-full"
          onClick={closeForm}
        >
          <BiX size="1.5rem" />
        </button>
        <h1 className="text-2xl font-semibold text-left">{showAddReader ? 'Add' : 'Update'} Reader</h1>
        <div className="relative w-fit">
          <BiUserCircle size="4rem" />
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
            name="rid"
            value={account.rid}
          />
          <div>
            <Input
              variant="standard"
              label="Username"
              required
              minLength={6}
              maxLength={20}
              onChange={handleChangeInfo}
              name="username"
              value={account.username}
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
            name="birthdate"
            value={account.birthdate}
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
            disabled
            type="date"
            value={account.regDate}
            name="regDate"
            labelProps={{ className: "peer-disabled:text-textDisable" }}
          />
          <Input
            variant="standard"
            label="Expiration date"
            disabled
            type="date"
            value={account.expDate}
            name="expDate"
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
