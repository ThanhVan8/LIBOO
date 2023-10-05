import React from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LiaTimesSolid, LiaUserSolid, LiaChartBarSolid } from "react-icons/lia";
import { GoBook, GoArrowRight, GoArrowLeft } from "react-icons/go";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../slices/menuSlice';
import { motion } from "framer-motion";
import {logoutUser} from "../slices/requestApi"

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

const MenuSidebar = () => {
  const location = useLocation();
  const {toggle} = useSelector(state => state.menu);
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;

  const dispatch = useDispatch();

  const handleToggleMenu = (e) => {
    e.preventDefault()
    dispatch(setToggle());
  }


  const logout = () => {
    logoutUser(dispatch, id, accessToken);
    dispatch(setToggle());
  }

  return(
    <div className={`fixed z-50 h-full ${location.pathname === '/Auth' ? 'hidden' : ''}`}>
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
                    <MenuItem icon={item.icon} text={item.text} active={location.pathname === item.path}/>
                  </Link>
                )
              })}
            </ul>

            <div className='w-full pl-8'>
              <button onClick={logout} className='flex gap-2 rounded-l-3xl'>
                <BiLogOut color='white' size='1.5rem' />
                <span className='text-white text-base'>Logout</span>
              </button>
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