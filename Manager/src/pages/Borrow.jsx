import React, {useState} from "react";
import {Input} from "@material-tailwind/react";
import CustomButton from "../components/CustomButton";
import SearchBar from "../components/SearchBar";
import { BiChevronLeft, BiChevronRight, BiDotsHorizontalRounded, BiRefresh } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import DeleteModal from "../components/DeleteModal";

const EXPIRATION = 7;
const TABLE_HEAD = ['Username', 'ISBN', 'Received date', ''];

const Borrow = () => {
  const data = [
    {
      username: 'user1',
      borrowList: [
        {
          book: '123456789',
          DueDate: '2023-09-26T17:00:00.000+00:00',
        },
        {
          book: '987654321',
          DueDate: '2023-09-26T17:00:00.000+00:00',
        }, 
      ],
      borrowDate: '2023-09-20T08:40:12.238+00:00',
    },
    {
      username: 'user2',
      borrowList: [
        {
          book: '123456789',
          DueDate: '2023-09-26T17:00:00.000+00:00',
        },
        {
          book: '987654321',
          DueDate: '2023-09-26T17:00:00.000+00:00',
        }, 
      ],
      borrowDate: '2023-09-20T08:40:12.238+00:00',
    },
    {
      username: 'user3',
      borrowList: [
        {
          book: '123456789',
          DueDate: '2023-09-26T17:00:00.000+00:00',
        },
        {
          book: '987654321',
          DueDate: '2023-09-26T17:00:00.000+00:00',
        }, 
      ],
      borrowDate: '2023-09-20T08:40:12.238+00:00',
    },
  ]

  const today = new Date()
  // const exp = new Date(today.getFullYear(), today.getMonth(), today.getDate() + EXPIRATION)

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }
  const calcDueDate = (receivedDate) => {
    const objReceived = new Date(receivedDate)
    const objDue = new Date(objReceived.getFullYear(), objReceived.getMonth(), objReceived.getDate() + EXPIRATION)
    return formatDate(objDue)
  }

  // const dueDate = formatDate(exp);

  const [slip, setSlip] = useState({username:'', isbns: [], borrowDate: formatDate(today), dueDate: calcDueDate(today)})
  const [tempISBN, setTempISBN] = useState('');

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setSlip({...slip, [name]: value});
  }

  const addISBN = (e) => {
    e.preventDefault();
    if(tempISBN !== '')
      setSlip({...slip, isbns: [...slip.isbns, tempISBN]});
  }

  const handleBorrow = (e) => {
    e.preventDefault();
    console.log(slip);
  }

  const showDetailBorrow = (selectedRecord) => {
    setSlip({
      username: selectedRecord.username,
      isbns: selectedRecord?.borrowList?.map((b) => b.book),
      borrowDate: formatDate(selectedRecord.borrowDate),
      dueDate: formatDate(selectedRecord?.borrowList?.[0]?.DueDate),
    });
  }

  const [toggleDelete, setToggleDelete] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const handleDelete = (e) => {
    e.preventDefault();
    console.log(selectedRequest);
    setToggleDelete(false)
  }

  const refreshBorrow = (e) => {
    e.preventDefault();
    setSlip({username:'', isbns: [], borrowDate: formatDate(today), dueDate: calcDueDate(today)})
  }

  const [borrowData, setBorrowData] = useState(data)
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const numPage = Math.ceil(borrowData?.length / recordsPerPage);
  const lastIdx = currentPage * recordsPerPage;
  const firstIdx = lastIdx - recordsPerPage;
  const records = borrowData?.slice(firstIdx, lastIdx);

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

  const filterSearch = ['username', 'ISBN']
  const [selectedFilter, setSelectedFilter] = useState(filterSearch[0]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === '') {
      setBorrowData(data);
      return;
    }
    const searchedData = data.filter((d) =>
      {
        if (selectedFilter === 'ISBN') {
          return d[selectedFilter].some((isbn) => isbn.includes(searchTerm));
        }
        else {
          return d[selectedFilter].toLowerCase().includes(searchTerm.toLowerCase())
        }
      }
    );
    setBorrowData(searchedData);
  }

  return (
    <div className="flex flex-col w-full h-full pl-16 pr-8 pt-3 pb-3 gap-8">
      {/* New Borrow */}
      <form className="w-full space-y-5" onSubmit={(e) => handleBorrow(e)}>
        <div className='flex justify-between'>
          <p className="text-2xl font-semibold">BORROW BOOKS</p>
          <button onClick={(e) => refreshBorrow(e)}>
            <BiRefresh size='2rem' />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className='col-span-2'>
            <Input
              variant="standard"
              label="Username"
              name="username"
              value={slip.username}
              onChange={handleChangeInfo}
              required
            />
          </div>
          <Input
            variant="standard"
            label="Borrowing date"
            name="borrowDate"
            value={slip.borrowDate}
            readOnly
          />
          <Input
            variant="standard"
            label="Due date"
            name="dueDate"
            value={slip.dueDate}
            readOnly
          />
          <div className="relative">
            <Input
              variant="standard"
              label="ISBNs"
              onInput={ (e) =>
                e.target.value = e.target.value.replace(/[^0-9]/g, '')
              }
              onChange={(e) => setTempISBN(e.target.value)}
            />
            <button
              className="absolute right-1 bottom-1 border-2 px-2 py-1 rounded-md bg-lightGrey font-medium"
              type="submit"
              onClick={addISBN}
            >
              Add
            </button>
          </div>
          <Input
            variant="standard"
            label="Borrowed books"
            value={slip.isbns?.join(", ")}
            readOnly
            required
          />
        </div>
        <div className="flex justify-center pt-3">
          <CustomButton label="Done" type="submit" />
        </div>
      </form>
      {/* Request */}
      <div className='w-full space-y-3'>
        <div className='flex justify-between'>
          <p className='text-2xl font-semibold'>REQUESTS</p>
          <SearchBar 
            filters={filterSearch}
            onClick={(e) => setSelectedFilter(e.target.value)} 
            onChange={handleSearch}
          />
        </div>
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
              // key={record._id} 
              <tr className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                <td className="p-2">
                  <p>{record.username}</p>
                </td>
                <td className="p-2">
                  <p>{record?.borrowList?.map((b) => b.book)?.join(', ')}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.borrowDate)}</p>
                </td>             
                <td className="p-2 space-x-6 text-right">
                  <button 
                    onClick={() =>
                      showDetailBorrow(record)
                    }
                  >
                    <BiDotsHorizontalRounded />
                  </button>
                  <button 
                    onClick={() => {setToggleDelete(true); setSelectedRequest(record)}}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>

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
      {toggleDelete && <DeleteModal onConfirm={(e) => handleDelete(e)} onClose={() => setToggleDelete(false)} />}
    </div>
  );
};

export default Borrow;
