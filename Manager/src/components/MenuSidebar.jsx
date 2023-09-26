import React from "react";
import {LiaTimesSolid} from "react-icons/lia";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom"
import { LiaUserSolid, LiaChartBarSolid } from "react-icons/lia";
import { GoBook, GoArrowRight, GoArrowLeft } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../slices/menuSlice';
import { motion } from "framer-motion";
import { BiMenu } from "react-icons/bi";

const items = [
  {
    icon: <LiaUserSolid color='white' size='1.5rem'/>,
    text: 'Readers',
    path: '/',
  },
  {
    icon: <GoBook color='white' size='1.5rem'/>,
    text: 'Books',
    path: '/Books'
  },
  {
    icon: <GoArrowRight color='white' size='1.5rem'/>,
    text: 'Borrow books',
    path: '/Borrow'
  },
  {
    icon: <GoArrowLeft color='white' size='1.5rem'/>,
    text: 'Return books',
    path: '/Return'
  },
  {
    icon: <LiaChartBarSolid color='white' size='1.5rem'/>,
    text: 'Statistics',
    path: '/Statistics'
  },
]

const MenuItem = ({icon, text, active}) => {
  return (
    <li className={`flex gap-2 px-3 py-2 rounded-l-3xl ${active ? 'bg-orange' : 'hover:bg-orange hover:bg-opacity-30'}`}>
      {icon}
      <span className='text-white text-base'>{text}</span>
    </li>
  )
}

const MenuSidebar = ({activeItem}) => {
  const {toggle} = useSelector(state => state.menu);

  const dispatch = useDispatch();
  const handleToggleMenu = (e) => {
    e.preventDefault()
    dispatch(setToggle());
  }

  return(
    <div className="z-50">
      {toggle &&
        <motion.div 
          className='bg-red rounded-r-[1.875rem] w-full h-full fixed shrink-0 sm:relative sm:w-[12.875rem]'
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.5 }}
        >
          <div className='flex flex-col items-center pt-14 pb-5 h-full'>
            <div className='flex items-center gap-3 h-fit'>
              <img src={logo} alt='logo' className='w-12 h-12'/>
              <p className='text-2xl font-semibold text-lightOrange'>LIBOO</p>
            </div>

            <ul className='flex flex-col gap-3 w-full pl-5 h-full pt-8'>
              {items.map((item, index) => {
                return (
                  <Link key={index} to={item.path}>
                    <MenuItem icon={item.icon} text={item.text} active={item.text === activeItem}/>
                  </Link>
                )
              })}
            </ul>

            <div className='flex w-full h-fit gap-2 pl-8 rounded-l-3xl'>
              <BiLogOut color='white' size='1.5rem' />
              <span className='text-white text-base'>Logout</span>
            </div>
          </div>
        </motion.div>
      }
      
      <motion.button 
        className='absolute top-3 left-4' 
        onClick={(e) => handleToggleMenu(e)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ rotate: 360, transition: { duration: 0.5 } }}
      >
        {!toggle ?
          <BiMenu size='2rem'  />
          :
          <LiaTimesSolid size='2rem' color='white' />
        }
      </motion.button>
    </div>
  );
};

export { MenuItem };
export default MenuSidebar;