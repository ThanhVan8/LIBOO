import React, {useState} from 'react'
import {Input} from "@material-tailwind/react";
import {useParams} from 'react-router-dom'
import CustomButton from '../components/CustomButton';
import { useEffect } from 'react';

const EXPIRATION = 7;

const Borrow = () => {
  const {id} = useParams()

  const [slip, setSlip] = useState({_id:'', username:'vann26', isbn: id ? id : '', borrowDate: '', dueDate: ''})
  
  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    const chosenDate = new Date(value);
    setSlip({...slip, borrowDate: value, dueDate: new Date(chosenDate.getFullYear(), chosenDate.getMonth(), chosenDate.getDate() + EXPIRATION).toISOString().split('T')[0]});
  }

  const handleBorrow = (e) => {
    e.preventDefault();
    console.log(slip)
  }

  return (
    <div className='pt-12 pl-2'>
      {/* Borrow */}
      <form className='space-y-6' onSubmit={handleBorrow}>
        <h1 className='text-2xl font-semibold'>BORROW BOOK</h1>
        <div className='grid grid-cols-2 gap-5'>
          <Input
            variant="standard"
            label="Username"
            value={slip.username}
            readOnly
          />
          <Input
            variant="standard"
            label="ISBN"
            value={slip.isbn}
            readOnly
          />
          <Input
            variant="standard"
            label="Received date (in 3 days)"
            name='borrowDate'
            value={slip.borrowDate}
            onChange={handleChangeInfo}
            type='date'
            min={(new Date()).toISOString().split('T')[0]}
            max={new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
            required
          />
          <Input
            variant="standard"
            label="Due date"
            value={slip.dueDate}
            type='date'
            readOnly
          />
        </div>
        <div className='flex justify-center'>
          <CustomButton label='done' type='submit' disabled={id ? false : true} />
        </div>
      </form>

      {/* Return */}
      <div></div>
    </div>
  )
}

export default Borrow