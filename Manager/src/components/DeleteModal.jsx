import React from 'react'
import { BiX, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setShowDeleteReader, setUpdatedReader } from '../slices/readerSlice';
import { Button } from '@material-tailwind/react';
import CustomButton from './CustomButton';

const DeleteModal = () => {
  const dispatch = useDispatch();
  const {updatedReader} = useSelector(state => state.reader); // RID of reader to be deleted

  const closeModal = () => {
    dispatch(setShowDeleteReader());
    dispatch(setUpdatedReader(null));
  }

  const handleDelete = (e) => {
    e.preventDefault();
    // console.log('Delete reader with RID: ', updatedReader);
    closeModal();
  }

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-25 w-full h-full flex justify-center items-center z-50">
      <form
        className="relative bg-white drop-shadow-md p-5 w-full md:w-[30rem] flex flex-col justify-center gap-10 rounded-lg"
        onSubmit={handleDelete}
      >
        <button
          className="absolute top-3 right-3 w-6 h-6 bg-lightGrey rounded-full"
          onClick={closeModal}
        >
          <BiX size="1.5rem" />
        </button>

        {/* Content */}
        <div className='flex gap-4 items-center'>
          {/* Icon */}
          <div className='bg-lightGrey flex justify-center items-center w-12 h-12 p-2 rounded-lg'>
            <BiTrash className='w-full h-full'/>
          </div>
          {/* Text */}
          <div className='space-y-1'>
            <p className='text-2xl font-medium'>Sure you want to delete?</p>
            <p className=''>Are you sure you want to delete this?</p>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex gap-5'>
          <Button className='bg-tranparant text-textPrimary border-textPrimary border w-full h-full' onClick={closeModal}>No, cancel</Button>
          <CustomButton label='Yes, confirm' classes='w-full h-full' type='submit' />
        </div>
      </form>
    </div>
  )
}

export default DeleteModal