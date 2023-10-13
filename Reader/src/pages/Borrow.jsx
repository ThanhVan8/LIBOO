import React, {useState, useEffect} from 'react'
import {Input} from "@material-tailwind/react";
import {useParams} from 'react-router-dom'
import CustomButton from '../components/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import { addSlip } from '../slices/requestApi';
import {BiRefresh, BiMessageAltError} from 'react-icons/bi'
import Modal from '../components/Modal';
import { getOneBook, getSlipsOfUser, renewDueDate } from '../slices/requestApi';

const EXPIRATION = 7;

const TABLE_HEAD = ['ISBN', 'Borrowing date' , 'Due date', '']

const Borrow = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.login?.currentUser)

  const today = new Date();
  const [slip, setSlip] = useState({username: user.username, isbn: id ? id : '', borrowDate: today.toISOString().split('T')[0], dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + EXPIRATION).toISOString().split('T')[0]})
  
  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    const chosenDate = new Date(value);
    setSlip({...slip, borrowDate: value, dueDate: new Date(chosenDate.getFullYear(), chosenDate.getMonth(), chosenDate.getDate() + EXPIRATION).toISOString().split('T')[0]});
  }

  const handleBorrow = (e) => {
    e.preventDefault();
    addSlip(user.accessToken, slip.username, slip.isbn, dispatch)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const [toggleRenew, setToggleRenew] = useState(false)
  const [toggleReport, setToggleReport] = useState(false)

  const [selectedBorrow, setSelectedBorrow] = useState({_id:'', isbn: '', borrowDate: '', dueDate: ''})
  const bookDetail = useSelector((state) => state.book.book?.currentBook);

  // check record's format
  const records = useSelector((state) => state.slip.slips?.allSlips);
  

  let borrowBooks = []
  records?.forEach(record => {
    record.borrowList?.forEach(borrow => {
      borrowBooks.push({_id: record._id, isbn: borrow.book?.ISBN, borrowDate: record.borrowDate, dueDate: borrow.DueDate})
    })
  })

  useEffect(() => {
    if(user?.accessToken){
      getSlipsOfUser(user?.accessToken, user?._id, dispatch)
    }
  }, [])

  useEffect(() => {
    if(user?.accessToken){
      getOneBook(user?.accessToken, selectedBorrow.isbn, dispatch);
    }
  }, [selectedBorrow])

  const handleRenew = (e) => {
    e.preventDefault();
    renewDueDate(user?.accessToken, selectedBorrow?._id, selectedBorrow?.isbn, dispatch)
    setToggleRenew(false);
  }
  return (
    <div className='pt-12 pb-2 pr-4 pl-5 space-y-8'>
      {/* Borrow */}
      <form className='space-y-6' onSubmit={handleBorrow}>
        <h1 className='text-2xl font-semibold'>BORROW BOOK</h1>
        <div className='grid grid-cols-2 gap-5'>
          <Input
            variant="standard"
            label="Username"
            value={slip.username}
            readOnly
          />
          <Input
            variant="standard"
            label="ISBN"
            value={slip.isbn}
            readOnly
          />
          <Input
            variant="standard"
            label="Received date (in 3 days)"
            name='borrowDate'
            value={slip.borrowDate}
            onChange={handleChangeInfo}
            type='date'
            min={(new Date()).toISOString().split('T')[0]}
            max={new Date(new Date().getTime() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
            required
          />
          <Input
            variant="standard"
            label="Due date"
            value={slip.dueDate}
            type='date'
            readOnly
          />
        </div>
        <div className='flex justify-center'>
          <CustomButton label='done' type='submit' disabled={id ? false : true} />
        </div>
      </form>

      {/* Return */}
      <div className='space-y-6'>
        <p className='text-2xl font-semibold'>BOOKS YOU HAVE BORROWED</p>
        <table className="w-full min-w-max table-auto text-left">
          <thead className='sticky top-0'>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4">
                  <p className="leading-none opacity-70">{head}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {borrowBooks?.map((record, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                <td className="p-2">
                  <p>{record?.isbn}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.borrowDate)}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.dueDate)}</p>
                </td>           
                <td className="p-2 pr-4 space-x-6 flex justify-end">
                  <button onClick={() => {setToggleRenew(true); setSelectedBorrow(record)}}>
                    <BiRefresh size='1.5rem' />
                  </button>
                  <button onClick={() => {setToggleReport(true); setSelectedBorrow(record)}}>
                    <BiMessageAltError size='1.5rem' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      {toggleRenew && 
        <Modal 
          onConfirm={handleRenew} 
          onClose={() => setToggleRenew(false)}
          icon={<BiRefresh className='w-full h-full'/>}
          heading='Sure you want to renew?'
          content='Are you sure you want to renew this?'
          hasButtons={true}
         />
      }
      {toggleReport && 
        <Modal 
          onClose={() => setToggleReport(false)}
          icon={<BiMessageAltError className='w-full h-full'/>}
          heading='You have lost this book?'
          content={<span>You will be fined <span className='text-red'>{bookDetail.price*2}</span> VND for losing it.</span>}
         />
      }
      </div>
    </div>
  )
}

export default Borrow