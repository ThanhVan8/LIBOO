import React, {useState} from "react";
import { Input, Checkbox } from "@material-tailwind/react";
import CustomButton from "../components/CustomButton";
import {deleteBookFromSlip} from "../slices/requestApi"
import { useSelector, useDispatch } from 'react-redux';


const NOTE = {
  ON_TIME: 'On time',
  OVERDUE: 'Overdue',
}

const Return = () => {

  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();


  const today = new Date()
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }
  const [slip, setSlip] = useState({username:'', isbn: '', returningDate: formatDate(today), note: NOTE.ON_TIME, lost: false, fine: 0})

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setSlip({...slip, [name]: value});
  }

  const handleReturn = (e) => {
    e.preventDefault();
    deleteBookFromSlip(slip.username, slip.isbn, user?.accessToken, dispatch)
  }

  return (
    <div className="flex flex-col w-full h-full px-4 pt-12 pb-3 gap-8">
      <form className="w-full space-y-5" onSubmit={(e) => handleReturn(e)}>
        <p className="text-2xl font-semibold">RETURN BOOKS</p>
        <div className="grid grid-cols-2 gap-5">
          <Input
            variant="standard"
            label="Username"
            name="username"
            value={slip.username}
            onChange={handleChangeInfo}
            required
          />
          <Input
            variant="standard"
            label="ISBN-13"
            name="isbn"
            value={slip.isbn}
            onChange={handleChangeInfo}
            onInput={(e) =>
              (e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1"))
            }
            pattern=".{13}"
            maxLength={13}
            required
          />
          <Input
            variant="standard"
            label="Returning date"
            name="returningDate"
            value={slip.returningDate}
            readOnly
          />
          <div className='flex gap-2'>
            <Input
              variant="standard"
              label="Note"
              name="note"
              value={slip.note}
              readOnly
              containerProps={{className: 'w-1/2'}}
            />
            <Checkbox label='Lost' onChange={() => setSlip({...slip, lost: true})} />
          </div>
          <Input
            variant="standard"
            label="Fine"
            name="fine"
            value={slip.fine}
            type="number"
            min={0}
            required
            onChange={handleChangeInfo}
          />
        </div>
        <div className="flex justify-center pt-3">
          <CustomButton label="Done" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Return;
