import React from 'react'
import { BiX } from "react-icons/bi";
import { Button } from '@material-tailwind/react';
import CustomButton from './CustomButton';

const Modal = ({onConfirm, onClose, icon, heading, content, hasButtons}) => {
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-25 w-full h-full flex justify-center items-center z-50">
      <form
        className="relative bg-white drop-shadow-md p-5 w-full md:w-[30rem] flex flex-col justify-center gap-10 rounded-lg"
        onSubmit={onConfirm}
      >
        <button
          className="absolute top-3 right-3 w-6 h-6 bg-lightGrey rounded-full"
          onClick={onClose}
        >
          <BiX size="1.5rem" />
        </button>

        {/* Content */}
        <div className='flex gap-4 items-center'>
          {/* Icon */}
          <div className='bg-lightGrey flex justify-center items-center w-12 h-12 p-2 rounded-lg'>
            {icon}
          </div>
          {/* Text */}
          <div className='space-y-1'>
            <p className='text-2xl font-medium'>{heading}</p>
            <p>{content}</p>
          </div>
        </div>
        

        {/* Buttons */}
        {hasButtons && 
            <div className='flex gap-5'>
            <Button className='bg-tranparant text-textPrimary border-textPrimary border w-full h-full' onClick={onClose}>No, cancel</Button>
            <CustomButton label='Yes, confirm' classes='w-full h-full' type='submit' />
            </div>
        }
      </form>
    </div>
  )
}

export default Modal