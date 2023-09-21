import React from 'react'
import { Button } from '@material-tailwind/react'

const CustomButton = ({label, onClick, type}) => {
  return (
    <Button 
      className='w-[300px] h-10' 
      style={{backgroundImage: `linear-gradient(to right, #EF9595, #EFB495)`}}
      onClick={onClick}
      type={type}
    >
      {label}
    </Button>
  )
}

export default CustomButton