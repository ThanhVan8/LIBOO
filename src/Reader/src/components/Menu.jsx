import React from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom"
import { LiaTimesSolid } from "react-icons/lia";
import { GoBook, GoArrowRight, GoArrowLeft } from "react-icons/go";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../slices/menuSlice';
import { motion } from "framer-motion";
import {logoutUser} from "../slices/requestApi"
import {FaFacebookSquare, FaInstagram} from "react-icons/fa"

const items = [
  {
    icon: <GoBook color='white' size='1.5rem'/>,
    text: 'Catalog',
    path: '/Catalog'
  },
  {
    icon: <GoArrowRight color='white' size='1.5rem'/>,
    text: 'Borrow/Renew',
    path: '/Borrow'
  },
  {
    icon: <GoArrowLeft color='white' size='1.5rem'/>,
    text: 'My account',
    path: '/Myaccount'
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

const Menu = () => {
  const location = useLocation();
  const {toggle} = useSelector(state => state.menu);
  const user = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();

  const handleToggleMenu = (e) => {
    e.preventDefault()
    dispatch(setToggle());
  }


  const logout = () => {
    console.log(user);
    logoutUser(dispatch, user?._id, user?.accessToken);
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
            <Link to='/' className='flex items-center gap-3 h-fit'>
              <img src={logo} alt='logo' className='w-12 h-12'/>
              <p className='text-2xl font-semibold text-lightOrange'>LIBOO</p>
            </Link>

            <ul className='flex flex-col gap-3 w-full pl-5 h-full pt-8'>
              {items.map((item, index) => {
                return (
                  <Link key={index} to={item.path}>
                    <MenuItem icon={item.icon} text={item.text} active={(location.pathname.lastIndexOf('/') === 0 ? location.pathname : location.pathname.slice(0,  location.pathname.lastIndexOf('/'))) === item.path}/>
                  </Link>
                )
              })}
            </ul>

            <div className='w-full pl-8 text-base space-y-3'>
              <hr className='mr-4' />
              <button onClick={logout} className='flex gap-2'>
                <BiLogOut color='white' size='1.5rem' />
                <span className='text-white'>Logout</span>
              </button>
              <hr className='mr-4' />
              <Link to='/rules'>
                <p className='font-medium text-white pt-2'>LIBOO rules</p>
              </Link>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/profile.php?id=100011493965643" target="_blank" rel="noreferrer">
                  <FaFacebookSquare color="white" size='1.5rem' />
                </a>
                <a href="#">
                  <FaInstagram color="white" size='1.5rem' />
                </a>
              </div>
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
export default Menu;