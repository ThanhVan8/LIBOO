import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { Button } from '@material-tailwind/react';
import { BiUserCircle, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { FaTrash, FaUserPlus } from 'react-icons/fa';
import { setShowAddReader, setShowUpdateReader, setUpdatedReader, setShowDeleteReader } from '../slices/readerSlice';
import ReaderForm from '../components/ReaderForm';
import DeleteModal from '../components/DeleteModal';
import { getAllUsers, deleteReader } from '../slices/requestApi'

const TABLE_HEAD = ['', 'Username', 'Name', 'ID', 'Birthdate', 'Sex', 'Email', 'Address', 'Reg. date', 'Exp. date', '', ''];

const Readers = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const readerList = useSelector((state) => state.reader.readers?.allUsers);
  
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const [readerData, setReaderData] = useState([])

  useEffect(() => {
    setReaderData(readerList);
  }, [readerList]);

  useEffect(() => {
    if(user?.accessToken){
      getAllUsers(user?.accessToken, dispatch);
    }
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const numPage = Math.ceil(readerData?.length / recordsPerPage);
  const lastIdx = currentPage * recordsPerPage;
  const firstIdx = lastIdx - recordsPerPage;
  const records = readerData?.slice(firstIdx, lastIdx);

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

  const filterSearch = ['name', 'username']
  const [selectedFilter, setSelectedFilter] = useState(filterSearch[0]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === '') {
      setReaderData(readerList);
      return;
    }
    const searchedReaders = readerList.filter((reader) => reader[selectedFilter].toLowerCase().includes(searchTerm.toLowerCase()));
    setReaderData(searchedReaders);
  }

  const {showAddReader, showUpdateReader, showDeleteReader, updatedReader } = useSelector(state => state.reader);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteReader(user?.accessToken, dispatch, updatedReader._id);

    dispatch(setUpdatedReader(null));
    dispatch(setShowDeleteReader());
  }
  
  return (
    <div className={`flex w-full h-full ${showAddReader || showUpdateReader || showDeleteReader ? 'overflow-hidden':''}`}>
      <div className='w-full px-4 py-3'>
        {/* Search bar */}
        <div className='flex justify-end pl-14'>
          <SearchBar 
            filters={filterSearch} 
            onClick={(e) => setSelectedFilter(e.target.value)} 
            onChange={handleSearch}
          />
        </div>

        {/* Heading */}
        <div className='flex justify-between py-4'>
          <p className='font-semibold text-2xl'>Reader list</p>
          <Button
            className="flex items-center gap-3" 
            size="sm" 
            style={{backgroundImage: `linear-gradient(to right, var(--my-red), var(--my-orange)`}}
            onClick={() => dispatch(setShowAddReader())}
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
            {records?.map((record) => (
              <tr key={record._id} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                <td className="p-2 w-12 h-12">
                  {!record.Photo ?
                  <BiUserCircle className='w-full h-full' /> :
                  <img src={record.Photo} alt="logo" className="w-full h-full rounded-full object-contain" />
                  }
                </td>
                <td className="p-2">
                  <p>{record.username}</p>
                </td>
                <td className="p-2">
                  <p>{record.name}</p>
                </td>
                <td className="p-2">
                  <p>{record.id}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.birthday)}</p>
                </td>
                <td className="p-2">
                  <p>{record.sex}</p>
                </td>
                <td className="p-2">
                  <p>{record.email}</p>
                </td>
                <td className="p-2">
                  <p>{record.address}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.makingDay)}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.invalidDay)}</p>
                </td>              
                <td className="p-2">
                  <button onClick={() => {dispatch(setUpdatedReader(record)); dispatch(setShowUpdateReader())}}>
                    <MdEdit />
                  </button>
                </td>
                <td className="p-2">
                  <button onClick={() => {dispatch(setUpdatedReader(record)); dispatch(setShowDeleteReader())}}>
                    <FaTrash />
                  </button>
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
      {(showAddReader || showUpdateReader) && <ReaderForm />}
      {showDeleteReader && <DeleteModal onConfirm={handleDelete} onClose={() => dispatch(setShowDeleteReader())} />}
    </div>
  )
}

export default Readers
