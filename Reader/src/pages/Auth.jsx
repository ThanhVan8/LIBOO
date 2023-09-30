import React from 'react'
import logo from '../assets/logo.png'
import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';
import NavLine from "../components/NavLine";
import {useDispatch, useSelector} from 'react-redux'
import { setCurrentAction } from '../slices/authSlice';

const Auth = () => {
  const dispatch = useDispatch()
  const {currentAction} = useSelector(state => state.auth)

  return (
    <div className='bg-lightOrange w-full h-full bg-bg1 bg-right bg-contain bg-no-repeat'>
      <div className='min-w-[500px] w-full h-full bg-white flex flex-col items-center justify-center py-10 px-5 gap-10 md:w-1/2 md:rounded-r-[30px]'>
        <div className='flex items-center gap-5 mb-10'>
          <div className='bg-red rounded-full w-fit h-fit p-2'>
            <img src={logo} alt='logo' className='w-[50px] h-auto'/>
          </div>
          <p className='font-semibold text-2xl'>Welcome to <span className='text-red'>LIBOO</span></p>
        </div>
        <NavLine element={currentAction} onShow={(props) => dispatch(setCurrentAction(props))} />
        {currentAction === 'Sign In' ? <SigninForm /> : <SignupForm />}
      </div>
    </div>
  )
}
export default Auth