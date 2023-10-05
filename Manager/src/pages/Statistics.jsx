import React, {useEffect, useState} from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAcceptedSlips } from '../slices/requestApi'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TABLE_HEAD = ['Username', 'Name', 'Email', 'Book', 'Overdue (days)'];

const Statistics = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const bookList = useSelector((state) => state.book.books?.allBooks);
  const readerList = useSelector((state) => state.reader.readers?.allUsers);
  const slips = useSelector((state) => state.slip.slips?.allSlips);
  
  const [numBookBorrowed, setNumBookBorrowed] = useState(0)
  const [genreData, setGenreData] = useState([])
  const [sexData, setSexData] = useState([])

  const [overdueData, setOverdueData] = useState([])

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

  const dispatch = useDispatch();

  useEffect(() => {
    if(user?.accessToken){
      getAllAcceptedSlips(user?.accessToken, dispatch)
    }
  }, [])

  const countUniqueGenre = () => {
    let unique = [];
    let res = [];
    bookList?.forEach((book) => {
      book?.genre?.forEach((genre) => {
        if (!unique.includes(genre)) {
          unique.push(genre);
          res.push({name: genre, value: 1});
        }
        else {
          let idx = unique.indexOf(genre);
          res[idx].value += 1;
        }
      });
    });
    return res;
  }

  const countUniqueSex = () => {
    let unique = ['Male', 'Female'];
    let res = [{name: 'Male', value: 0}, {name: 'Female', value: 0}];
    readerList?.forEach((reader) => {
      let idx = unique.indexOf(reader.sex);
      if (idx !== -1)
        res[idx].value += 1;
    });
    return res;
  }

  const findReaderOverdue = () => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const today = new Date();

    let res = [];
    slips?.forEach((slip) => {
      let reader = readerList?.find((reader) => reader._id === slip.UserID._id);
      slip?.borrowList?.forEach((borrow) => {
        const diffDays = Math.round((today - new Date(borrow.DueDate)) / oneDay);
        if (diffDays > 0) {
          console.log(bookList, borrow);
          let book = bookList?.find((book) => book._id === borrow.book._id);
          if (reader && book)
            res.push({
              username: reader.username,
              name: reader.name,
              email: reader.email,
              book: book.name,
              overdue: diffDays,
            });
        }
      });
    })
    return res;
  }

  useEffect(() => {
    setGenreData(countUniqueGenre());
  }, [bookList])

  useEffect(() => {
    setSexData(countUniqueSex());
  }, [readerList])

  useEffect(() => {
    setNumBookBorrowed(() => {
      let count = 0;
      slips?.forEach((slip) => {
        count += slip.borrowList.length;
      });
      return count;
    });

    setOverdueData(findReaderOverdue());

  }, [slips]);

  return (
    <div className='px-4 pt-12 pb-3 space-y-3 w-full'>
      <p className='text-2xl font-semibold'>STATISTICS</p>

      <div className='space-y-3 w-full'>
        <p className='text-xl font-medium'>BOOKS</p>
        <p>Number of books: <span className='text-red'>{bookList.length}</span></p>
        <p>Number of books being borrowed: <span className='text-red'>{numBookBorrowed}</span></p>
        <div className='flex items-center w-full'>
          <div className='flex flex-col space-y-3 w-full items-center'>
            <PieChart width={730} height={250}>
              <Pie data={genreData} fill="#EFD595" label={(entry) => entry.name} >
                {genreData.map((entry, index) => (
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
        <p>Number of readers: <span className='text-red'>{readerList.length}</span></p>
        <div className='flex items-center w-full'>
          <div className='flex flex-col space-y-3 w-full items-center'>
            <PieChart width={730} height={250}>
              <Pie data={sexData} fill="#EFD595" label={(entry) => entry.name} >
                {sexData.map((entry, index) => (
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
                    <p>{record.book}</p>
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
