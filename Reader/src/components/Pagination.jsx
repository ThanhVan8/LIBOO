import React from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const Pagination = ({numPage, active, nextPage, prevPage, changePage}) => {
  const maxPage = 5;
  const currentPageGroup = Math.ceil(active / maxPage);
  const lastIdxPage = currentPageGroup * maxPage;
  const firstIdxPage = lastIdxPage - maxPage + 1;

  const pages = [];
  for (let i = firstIdxPage; i <= lastIdxPage; i++) {
    if (i > numPage) break;
    pages.push(i);
  }

  return (
    <div className='flex gap-3'>
      <button className='border rounded-md' onClick={prevPage} disabled={active===pages[0]}>
        <BiChevronLeft size='1.3rem'/>
      </button>
      {pages.map((page) => (
        <button 
          key={page} 
          className={`${active === page && 'bg-red text-white rounded-md px-2 py-1'}`}
          onClick={() => changePage(page)}
        >
          {page}
        </button>
      ))}
      <button className='border rounded-md' onClick={nextPage} disabled={active===pages.at(-1)}>
        <BiChevronRight size='1.3rem'/>
      </button>
    </div>
  )
}

export default Pagination