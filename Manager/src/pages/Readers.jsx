import React, {useState} from 'react'
import MenuSidebar from '../components/MenuSidebar'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import SearchBar from '../components/SearchBar';
import { Button } from '@material-tailwind/react';
import { BiUserCircle, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { FaTrash, FaUserPlus } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { setShowAddReader, setShowUpdateReader, setUpdatingReader } from '../slices/readerSlice';
import ReaderForm from '../components/ReaderForm';

const TABLE_HEAD = ['', 'RID', 'Username', 'Name', 'ID', 'Birthdate', 'Sex', 'Email', 'Address', 'Reg. date', 'Exp. date', '', ''];

const Readers = () => {
  const [readerData, setReaderData] = useState([
    {
      RID: '1',
      Username: 'user1',
      Name: 'John Doe',
      ID: '123456789',
      Birthdate: '2000-01-01',
      Sex: 'Male',
      Email: 'JohnDoe@gmail.com',
      Address: '1234 Main St',
      RegDate: '2022-01-01',
      ExpDate: '2024-01-01',
    },
    {
      RID: '2',
      Username: 'user2',
      Name: 'Jane Doe',
      ID: '987654321',
      Birthdate: '2000-01-01',
      Sex: 'Female',
      Email: 'JohnDoe@gmail.com',
      Address: '1234 Main St',
      RegDate: '2022-01-01',
      ExpDate: '2024-01-01',
    },
    {
      RID: '3',
      Username: 'user3',
      Name: 'Jane Doe',
      ID: '987654321',
      Birthdate: '2000-01-01',
      Sex: 'Female',
      Email: 'JohnDoe@gmail.com',
      Address: '1234 Main St',
      RegDate: '2022-01-01',
      ExpDate: '2024-01-01',
    },
    {
      RID: '4',
      Username: 'user3',
      Name: 'Jane Doe',
      ID: '987654321',
      Birthdate: '2000-01-01',
      Sex: 'Female',
      Email: 'JohnDoe@gmail.com',
      Address: '1234 Main St',
      RegDate: '2022-01-01',
      ExpDate: '2024-01-01',
    },
    {
      RID: '5',
      Username: 'user3',
      Name: 'Jane Doe',
      ID: '987654321',
      Birthdate: '2000-01-01',
      Sex: 'Female',
      Email: 'JohnDoe@gmail.com',
      Address: '1234 Main St',
      RegDate: '2022-01-01',
      ExpDate: '2024-01-01',
    },
    {
      RID: '6',
      Username: 'user3',
      Name: 'Jane Doe',
      ID: '987654321',
      Birthdate: '2000-01-01',
      Sex: 'Female',
      Email: 'JohnDoe@gmail.com',
      Address: '1234 Main St',
      RegDate: '2022-01-01',
      ExpDate: '2024-01-01',
    },
    {
      RID: '7',
      Username: 'user3',
      Name: 'Jane Doe',
      ID: '987654321',
      Birthdate: '2000-01-01',
      Sex: 'Female',
      Email: 'JohnDoe@gmail.com',
      Address: '1234 Main St',
      RegDate: '2022-01-01',
      ExpDate: '2024-01-01',
    },
    {
      RID: '8',
      Username: 'user3',
      Name: 'Jane Doe',
      ID: '987654321',
      Birthdate: '2000-01-01',
      Sex: 'Female',
      Email: 'JohnDoe@gmail.com',
      Address: '1234 Main St',
      RegDate: '2022-01-01',
      ExpDate: '2024-01-01',
    }
  ])

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const numPage = Math.ceil(readerData.length / recordsPerPage);
  const lastIdx = currentPage * recordsPerPage;
  const firstIdx = lastIdx - recordsPerPage;
  const records = readerData.slice(firstIdx, lastIdx);

  const nextPage = () => {
    if (currentPage < numPage) {
      setCurrentPage(currentPage + 1);
    }
  }
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const selectFilter = (e) => {
    console.log(e.target.value)
  }

  const handleSearch = (e) => {
    console.log(e.target.value)
  }

  const dispatch = useDispatch();
  const showAddForm = (e) => {
    e.preventDefault();
    dispatch(setShowAddReader());
  }
  const showUpdateForm = (e, props) => {
    e.preventDefault();
    dispatch(setShowUpdateReader());
    dispatch(setUpdatingReader(props));
  }
  const {showAddReader, showUpdateReader, updatingReader } = useSelector(state => state.reader);
 
  return (
    <div className={`flex w-full h-full ${showAddReader || showUpdateReader ? 'overflow-hidden':''}`}>
      <MenuSidebar activeItem={'Readers'}  />

      <div className='w-full px-4 py-3'>
        {/* Search bar */}
        <div className='flex justify-end pl-14'>
          <SearchBar filters={['Name', 'ISBN']} onClick={selectFilter} onChange={handleSearch}/>
        </div>

        {/* Heading */}
        <div className='flex justify-between py-4'>
          <p className='font-semibold text-2xl'>Reader list</p>
          <Button
            className="flex items-center gap-3" 
            size="sm" 
            style={{backgroundImage: `linear-gradient(to right, #EF9595, #EFB495)`}}
            onClick={showAddForm}
          >
            <FaUserPlus strokeWidth={2} className="h-4 w-4" /> Add member
          </Button>
        </div>

        {/* Table */}
        <div className='w-full min-h-max overflow-x-scroll'>
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
            {records.map(({ RID, Username, Name, ID, Birthdate, Sex, Email, Address, RegDate, ExpDate }, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                <td className="p-2">
                  <BiUserCircle size={24} />
                  {/* <img src={logo} alt="logo" className="w-8 h-8 rounded-full object-contain" /> */}
                </td>
                <td className="p-2">
                  <p>{RID}</p>
                </td>
                <td className="p-2">
                  <p>{Username}</p>
                </td>
                <td className="p-2">
                  <p>{Name}</p>
                </td>
                <td className="p-2">
                  <p>{ID}</p>
                </td>
                <td className="p-2">
                  <p>{Birthdate}</p>
                </td>
                <td className="p-2">
                  <p>{Sex}</p>
                </td>
                <td className="p-2">
                  <p>{Email}</p>
                </td>
                <td className="p-2">
                  <p>{Address}</p>
                </td>
                <td className="p-2">
                  <p>{RegDate}</p>
                </td>
                <td className="p-2">
                  <p>{ExpDate}</p>
                </td>              
                <td className="p-2">
                  <button onClick={(e) => showUpdateForm(e, {RID, Username, Name, ID, Birthdate, Sex, Email, Address, RegDate, ExpDate})}>
                    <MdEdit />
                  </button>
                </td>
                <td className="p-2">
                  <FaTrash />
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      </div>

      {/* Pagination */}
      <div className='flex items-center gap-2 justify-end text-base'>
        <button className='border rounded-md' onClick={prevPage} disabled={currentPage===1}>
          <BiChevronLeft size='1.3rem'/>
        </button>
        <p>Page <strong>{currentPage}</strong> of <strong>{numPage}</strong></p>
        <button className='border rounded-md' onClick={nextPage} disabled={currentPage===numPage}>
          <BiChevronRight size='1.3rem'/>
        </button>
      </div>

      </div>
      {showAddReader && <ReaderForm />}
      {showUpdateReader && <ReaderForm {...updatingReader} />}
    </div>
  )
}

export default Readers
