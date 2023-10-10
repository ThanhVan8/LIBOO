import React from 'react'
import logo from '../assets/logo.png'
import {BiChevronRight} from 'react-icons/bi'
import CustomButton from '../components/CustomButton'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  const navigateToCatalog = () => {
    navigate('/Catalog')
  }

  return (
    <div className='flex relative w-full h-full bg-bg1 bg-right bg-contain bg-no-repeat'>
      <div className='bg-red rounded-full p-1 w-fit h-fit absolute top-3 right-4'>
        <img src={logo} alt='logo' className='w-10 h-auto' />
      </div>

      <div className='self-center w-1/2 space-y-8 pl-16'>
        <p className='text-5xl text-red font-semibold'>LIBOO</p>
        <p className='text-justify text-base'>LIBOO is not only a repository of information but also a vibrant community hub where individuals of all ages can come together to read, study, research, and connect. Join us in this virtual realm of literary exploration and convenience, where your love for books meets the convenience of the digital age.</p>
        <CustomButton classes='w-32' label='Explore' icon={<BiChevronRight color='white' size='1.5rem' />} onClick={navigateToCatalog} />
      </div>
    </div>
  )
}

export default Home