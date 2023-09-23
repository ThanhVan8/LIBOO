import React from 'react'
import { useDispatch } from 'react-redux';
import { navigate } from '../slices/authNavSlice';

const NavLine = ({element}) => {
  const dispatch = useDispatch()

  const handleNav = (e, navTo) => {
    e.preventDefault()
    const action = navigate(navTo)
    dispatch(action)
  }

  return (
    <div className='space-x-10'>
        <button 
          className={`font-semibold text-gray-500 ${element === 'Sign In' ? 'border-b-2 border-red text-red' : ''}`}
          onClick={(e) => handleNav(e, 'Sign In')}
        >
            Sign In
        </button>
        <button 
          className={`font-semibold text-gray-500 ${element === 'Sign Up' ? 'border-b-2 border-red text-red' : ''}`}
          onClick={(e) => handleNav(e, 'Sign Up')}
        >
            Sign Up
        </button>
    </div>
  )
}

export default NavLine