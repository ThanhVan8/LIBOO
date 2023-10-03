import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { Button } from '@material-tailwind/react';
import { BiBookOpen, BiChevronLeft, BiChevronRight, BiSolidBookAdd } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { setShowAddBook, setShowUpdateBook, setUpdatedBook, setShowDeleteBook } from '../slices/bookSlice';
import BookForm from '../components/BookForm';
import DeleteModal from '../components/DeleteModal';
import { getAllBooks } from '../slices/requestApi';

const TABLE_HEAD = ['', 'ISBN', 'Name', 'Author', 'Publisher', 'Year', 'Genre', 'Price', 'Quantity', 'Borrowed', '', ''];

const Books = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const bookList = useSelector((state) => state.book.books?.allBooks);

  const dispatch = useDispatch();

  const [bookData, setBookData] = useState(bookList)

  useEffect(() => {
    setBookData(bookList);
  }, [bookList]);

  useEffect(() => {
    if(user?.accessToken){
      getAllBooks(user?.accessToken, dispatch);
    }
    
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const numPage = Math.ceil(bookData?.length / recordsPerPage);
  const lastIdx = currentPage * recordsPerPage;
  const firstIdx = lastIdx - recordsPerPage;
  const records = bookData?.slice(firstIdx, lastIdx);

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

  const filterSearch = ['name', 'ISBN', 'author', 'publisher', 'genre']
  const [selectedFilter, setSelectedFilter] = useState(filterSearch[0]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === '') {
      setBookData(bookData);
      return;
    }
    const searchedBooks = bookData.filter((book) => book[selectedFilter].toLowerCase().includes(searchTerm.toLowerCase()));
    setBookData(searchedBooks);
  }

  const {showAddBook, showUpdateBook, showDeleteBook, updatedBook } = useSelector(state => state.book);

  const handleDelete = (e) => {
    e.preventDefault();
    console.log('Delete book: ', updatedBook);

    dispatch(setUpdatedBook(null));
    dispatch(setShowDeleteBook());
  }
   
  return (
    <div className={`flex w-full h-full ${showAddBook || showUpdateBook || showDeleteBook ? 'overflow-hidden':''}`}>
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
          <p className='font-semibold text-2xl'>Book list</p>
          <Button
            className="flex items-center gap-3" 
            size="sm" 
            style={{backgroundImage: `linear-gradient(to right, var(--my-red), var(--my-orange)`}}
            onClick={() => dispatch(setShowAddBook())}
          >
            <BiSolidBookAdd className="h-4 w-4" /> Add book
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
                  {!record.photo ?
                  <BiBookOpen className='w-full h-full' /> :
                  <img src={record.photo} alt="logo" className="w-full h-full rounded-full object-contain" />
                  }
                </td>
                <td className="p-2">
                  <p>{record.ISBN}</p>
                </td>
                <td className="p-2">
                  <p>{record.name}</p>
                </td>
                <td className="p-2">
                  <p>{record.author}</p>
                </td>
                <td className="p-2">
                  <p>{record.publisher}</p>
                </td>
                <td className="p-2">
                  <p>{record.publishYear}</p>
                </td>
                <td className="p-2">
                  <p>{record.genre.join(', ')}</p>
                </td>
                <td className="p-2">
                  <p>{record.price}</p>
                </td>
                <td className="p-2">
                  <p>{record.quantity}</p>
                </td>
                <td className="p-2">
                  <p>{record.borrowed}</p>
                </td>              
                <td className="p-2">
                  <button 
                  onClick={() => {
                    dispatch(setUpdatedBook(record))
                    dispatch(setShowUpdateBook()); 
                  }}>
                    <MdEdit />
                  </button>
                </td>
                <td className="p-2">
                  <button onClick={() => {
                    dispatch(setUpdatedBook(record))
                    dispatch(setShowDeleteBook()); 
                  }}>
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
      {(showAddBook || showUpdateBook) && <BookForm />}
      {showDeleteBook && <DeleteModal onConfirm={handleDelete} onClose={() => dispatch(setShowDeleteBook())} />}
    </div>
  )
}

export default Books