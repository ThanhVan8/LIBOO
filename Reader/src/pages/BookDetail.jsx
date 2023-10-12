import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import book from '../assets/book.png'
import SearchBar from '../components/SearchBar'
import CustomButton from '../components/CustomButton'
import {BiChevronUp, BiChevronDown} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getOneBook } from '../slices/requestApi';


const BookDetail = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const data = useSelector((state) => state.book.books?.allBooks);
  const currentBook = useSelector((state) => state.book.book?.currentBook);
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.accessToken){
      getOneBook(user?.accessToken, id, dispatch);
    }
  }, [id])
  
  const gotoBorrow = () => {
    navigate(`/Borrow/${id}`)
  }

  return (
    <div className='w-full h-full space-y-3 py-2 pr-4 pl-3'>
      <div className='flex justify-end'>
        <SearchBar data={data} />
      </div>
      {currentBook &&
      <div className='w-full flex gap-4 h-fit'>
        <img src={currentBook.image} alt="book" className='w-40 h-auto object-contain place-self-start shrink-0' />
        
        {/* Detail */}
        <div className='w-full space-y-2'>
          <h1 className='text-2xl font-semibold'>{currentBook.name}</h1>
          <p className='text-lg'>ISBN: <span className='font-medium text-red'>{currentBook.ISBN}</span></p>
          <p> Author: {currentBook.author} </p>
          <p> Publisher: {currentBook.publisher} </p>
          <p> Publish year: {currentBook.publishYear} </p>
          <p> Genre: {currentBook.genre?.join(', ')} </p>
          <p> Price: {currentBook.price} VND </p>
          <div>
            <p className='font-medium'>Description:</p>
            <p className={`text-justify ${expanded ? 'line-clamp-none' : 'line-clamp-4'}`}>{currentBook.description}</p>
            <button
              onClick={() => setExpanded(!expanded)}
              className='space-x-1'
            >
              <span className='text-red'>{expanded ? 'Read less' : 'Read more'}</span>
              {expanded ? <BiChevronUp size='1rem' color='var(--my-red)' className='inline-block' /> : <BiChevronDown size='1rem' color='var(--my-red)' className='inline-block' />}
            </button>
          </div>
        </div>

        {/* Note */}
        <div className='w-fit h-fit border-2 border-lightGrey rounded-md px-4 py-2 space-y-3'>
          <p className='text-lg font-medium'>{currentBook.borrowed < currentBook.quantity ? 
            <span className='text-available'>Available</span> : 
            <span className='text-unavailable'>Not available</span>}
          </p>
          <p>Amount: <span className='font-medium'>{currentBook.quantity}</span></p>
          <p>Available: <span className='font-medium'>{currentBook.quantity - currentBook.borrowed}</span></p>
          <CustomButton label='Borrow' classes='self-center w-[12rem]' disabled={currentBook.borrowed >= currentBook.quantity} onClick={gotoBorrow} />
        </div>
      </div>
    }
    </div>
  )
}

export default BookDetail