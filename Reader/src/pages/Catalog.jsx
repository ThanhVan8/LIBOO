import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import book from '../assets/book.png'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBooks} from '../slices/requestApi';


const Catalog = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const bookList = useSelector((state) => state.book.books?.allBooks);


  const dispatch = useDispatch();


  const [data, setData] = useState(bookList)

  useEffect(() => {
    setData(bookList);
  }, [bookList]);

  useEffect(() => {
    if(user?.accessToken){
      getAllBooks(user?.accessToken, dispatch);
    }
  }, [])



  const recordsPerPage = 30;
  const numPage = Math.ceil(data?.length / recordsPerPage);
  const lastIdx = currentPage * recordsPerPage;
  const firstIdx = lastIdx - recordsPerPage;
  const records = data?.slice(firstIdx, lastIdx);

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
  const gotoPage = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className='w-full space-y-3 py-2 pr-4 pl-3'>
      <div className='flex justify-end'>
        <SearchBar data={data} />
      </div>
      <div className='flex flex-col w-full items-center gap-6'>
        <h1 className='text-2xl font-semibold'>CATALOG</h1>
        <div className='grid grid-cols-6 gap-4 max-w-fit'>
          {records?.map((item) => (
            <Link key={item._id} to={`/Catalog/${item.ISBN}`}>
              <div className='flex flex-col items-center gap-2'>
                <div className='relative'>
                  <img src={item.photo} alt='book' className='peer' />
                  <p className='hidden peer-hover:block peer-hover:absolute peer-hover:top-0 peer-hover:right-0 peer-hover:bg-red peer-hover:text-white peer-hover:px-2 peer-hover:py-1'>{item.ISBN}</p>
                </div>
                <p className='text-center text-sm'>{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <Pagination
          numPage={numPage}
          active={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
          changePage={(props) => gotoPage(props)}
        />
      </div>
    </div>
  )
}

export default Catalog