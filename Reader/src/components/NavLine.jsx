import React from 'react'

const NavLine = ({element, onShow}) => {
  return (
    <div className='space-x-10'>
        <button 
          className={`font-semibold text-gray-500 ${element === 'Sign In' ? 'border-b-2 border-red text-red' : ''}`}
          onClick={() => onShow('Sign In')}
        >
            Sign In
        </button>
        <button 
          className={`font-semibold text-gray-500 ${element === 'Sign Up' ? 'border-b-2 border-red text-red' : ''}`}
          onClick={() => onShow('Sign Up')}
        >
            Sign Up
        </button>
    </div>
  )
}

export default NavLine