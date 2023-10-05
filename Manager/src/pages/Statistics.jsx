import React, {useState} from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const numBook = 100;

const numBookBorrowed = 20;

const bookGenreData = [
  {name: 'Fiction', value: 25},
  {name: 'nonFiction', value: 35},
  {name: 'science', value: 20},
  {name: 'history', value: 5},
  {name: 'art', value: 15},
]

const numReader = 316;

const readerSexData = [
  {name: 'Male', value: 150},
  {name: 'Female', value: 166},
]

const readerOverdue = [
  {
    username: 'user1',
    name: 'Nguyen Van A',
    email: 'nva@gmail.com',
    overdue: 5,
  },
  {
    username: 'user2',
    name: 'Nguyen Van B',
    email: 'nvb@gmail.com',
    overdue: 3,
  },
  {
    username: 'user3',
    name: 'Nguyen Van C',
    email: 'nvc@gmail.com',
    overdue: 1,
  },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TABLE_HEAD = ['Username', 'Name', 'Email', 'Overdue (days)'];

const Statistics = () => {
  const [overdueData, setOverdueData] = useState(readerOverdue)

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const numPage = Math.ceil(overdueData?.length / recordsPerPage);
  const lastIdx = currentPage * recordsPerPage;
  const firstIdx = lastIdx - recordsPerPage;
  const records = overdueData?.slice(firstIdx, lastIdx);

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

  return (
    <div className='pl-16 pr-8 pt-3 pb-3 space-y-3 w-full'>
      <p className='text-2xl font-semibold'>STATISTICS</p>

      <div className='space-y-3 w-full'>
        <p className='text-xl font-medium'>BOOKS</p>
        <p>Number of books: <span className='text-red'>{numBook}</span></p>
        <p>Number of books being borrowed: <span className='text-red'>{numBookBorrowed}</span></p>
        <div className='flex items-center w-full'>
          <div className='flex flex-col space-y-3 w-full items-center'>
            <PieChart width={730} height={250}>
              <Pie data={bookGenreData} fill="#EFD595" label={(entry) => entry.name} >
                {bookGenreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <p>Number of books by genres</p>
          </div>
        </div>
      </div>

      <hr className='w-full rounded-sm bg-textPrimary h-0.5' />

      <div className='space-y-3 w-full'>
        <p className='text-xl font-medium'>READERS</p>
        <p>Number of readers: <span className='text-red'>{numReader}</span></p>
        <div className='flex items-center w-full'>
          <div className='flex flex-col space-y-3 w-full items-center'>
            <PieChart width={730} height={250}>
              <Pie data={readerSexData} fill="#EFD595" label={(entry) => entry.name} >
                {bookGenreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <p>Number of readers by sex</p>
          </div>
        </div>

        <div className='space-y-3'>
          <p>List of readers overdue:</p>
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
              {records?.map((record, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                  <td className="p-2">
                    <p>{record.username}</p>
                  </td>
                  <td className="p-2">
                    <p>{record.name}</p>
                  </td>
                  <td className="p-2">
                    <p>{record.email}</p>
                  </td>
                  <td className="p-2">
                    <p>{record.overdue}</p>
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
      </div>
    </div>
  );
};

export default Statistics;
