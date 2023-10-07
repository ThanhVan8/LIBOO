import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import book from '../assets/book.png'

const data = [
  {
    _id: '1',
    ISBN: '9783161484100',
    name: 'Tôi thấy hoa vàng trên cỏ xanh',
    photo: book,
  },
  {
    _id: '2',
    ISBN: '9783161484101',
    name: 'Mắt biếc',
    photo: book,
  },
  {
    _id: '3',
    ISBN: '9783161484102',
    name: 'Pháp luật đại cương',
    photo: book,
  },
  {
    _id: '4',
    ISBN: '9783161484100',
    name: 'Tôi thấy hoa vàng trên cỏ xanhhhhhhhhh',
    photo: book,
  },
  {
    _id: '5',
    ISBN: '9783161484101',
    name: 'Mắt biếc',
    photo: book,
  },
  {
    _id: '6',
    ISBN: '9783161484102',
    name: 'Pháp luật đại cương',
    photo: book,
  },
  {
    _id: '7',
    ISBN: '9783161484100',
    name: 'Tôi thấy hoa vàng trên cỏ xanh',
    photo: book,
  },
  {
    _id: '8',
    ISBN: '9783161484101',
    name: 'Mắt biếccc',
    photo: book,
  },
]

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className='w-full space-y-3'>
      <div className='flex justify-end'>
        <SearchBar data={data} />
      </div>
      <div className='flex flex-col w-full items-center gap-6'>
        <h1 className='text-2xl font-semibold'>CATALOG</h1>
        <div className='grid grid-cols-6 gap-4 max-w-fit'>
          {records?.map((item) => (
            <Link key={item._id} to={`/Catalog/${item._id}`}>
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