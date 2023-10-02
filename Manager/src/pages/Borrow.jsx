import React, {useState} from "react";
import {Input} from "@material-tailwind/react";
import CustomButton from "../components/CustomButton";

const EXPIRATION = 7;

const Borrow = () => {
  const today = new Date()
  const exp = new Date(today.getFullYear(), today.getMonth(), today.getDate() + EXPIRATION)

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const dueDate = formatDate(exp);

  const [slip, setSlip] = useState({username:'', borrowList: [{}], borrowDate: formatDate(today)})

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    if (name === 'borrowList') {
      const values = value.split(',').map((v) => v.trim());

      // Remove empty strings
      const filteredValues = values.filter((v) => v !== '');

      const listTemp = filteredValues.map((v) => ({book: v, DueDate: dueDate}));
      setSlip({...slip, borrowList: listTemp});
    }
    else {
      setSlip({...slip, [name]: value});
    }
  }

  const handleBorrow = (e) => {
    e.preventDefault();
    console.log(slip);
  }

  return (
    <div className="flex w-full h-full pl-16 pr-4 pt-3 pb-3">
      {/* New Borrow */}
      <form className="w-full space-y-5" onSubmit={handleBorrow}>
        <p className="text-2xl font-semibold">BORROW BOOKS</p>
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
            label="ISBNs"
            name="borrowList"
            // value={slip.borrowList.join(", ")}
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^0-9,]/g, ""))
            }
            onChange={handleChangeInfo}
            required
          />
          <Input
            variant="standard"
            label="Borrowing date"
            name="borrowDate"
            value={slip.borrowDate}
            readOnly
          />
          <Input
            variant="standard"
            label="Due date"
            value={dueDate}
            readOnly
          />
        </div>
        <div className="flex justify-center pt-3">
          <CustomButton label="Done" type="submit" />
        </div>
      </form>
      {/* Request */}
      <div></div>
    </div>
  );
};

export default Borrow;
