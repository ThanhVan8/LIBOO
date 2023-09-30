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
import { getAllUsers } from '../slices/requestApi'
import { useNavigate } from 'react-router-dom';

const TABLE_HEAD = ['', 'Username', 'Name', 'ID', 'Birthdate', 'Sex', 'Email', 'Address', 'Reg. date', 'Exp. date', '', ''];

const Readers = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const readerList = useSelector((state) => state.reader.readers?.allUsers);
  // const len = readerList?.length;
  // console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //DUMMY DATA
  const data = [
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
      Photo: '',
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
      Photo: '',
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
      Photo: '',
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
      Photo: '',
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
      Photo: '',
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
      Photo: '',
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
      Photo: '',
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
      Photo: '',
    },
  ]
  const [readerData, setReaderData] = useState(data)

  useEffect(() => {
    if(!user){
      navigate('/auth');
    }

    if(user?.accessToken){
      getAllUsers(user?.accessToken, dispatch);
      console.log(readerList)
    }

    
  }, [])

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

  const filterSearch = ['Name', 'Username']
  const [selectedFilter, setSelectedFilter] = useState(filterSearch[0]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === '') {
      setReaderData(data);
      return;
    }
    const searchedReaders = data.filter((reader) => reader[selectedFilter].toLowerCase().includes(searchTerm.toLowerCase()));
    setReaderData(searchedReaders);
  }

  const {showAddReader, showUpdateReader, showDeleteReader, updatedReader } = useSelector(state => state.reader);

  const handleDelete = (e) => {
    e.preventDefault();
    // console.log('Delete reader: ', updatedReader);

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
            {records.map((record) => (
              <tr key={record.RID} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                <td className="p-2 w-12 h-12">
                  {!record.Photo ?
                  <BiUserCircle className='w-full h-full' /> :
                  <img src={record.Photo} alt="logo" className="w-full h-full rounded-full object-contain" />
                  }
                </td>
                <td className="p-2">
                  <p>{record.Username}</p>
                </td>
                <td className="p-2">
                  <p>{record.Name}</p>
                </td>
                <td className="p-2">
                  <p>{record.ID}</p>
                </td>
                <td className="p-2">
                  <p>{record.Birthdate}</p>
                </td>
                <td className="p-2">
                  <p>{record.Sex}</p>
                </td>
                <td className="p-2">
                  <p>{record.Email}</p>
                </td>
                <td className="p-2">
                  <p>{record.Address}</p>
                </td>
                <td className="p-2">
                  <p>{record.RegDate}</p>
                </td>
                <td className="p-2">
                  <p>{record.ExpDate}</p>
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
