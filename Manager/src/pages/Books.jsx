import React, {useState} from 'react'
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

const TABLE_HEAD = ['', 'ISBN', 'Name', 'Author', 'Publisher', 'Year', 'Genre', 'Price', 'Quantity', 'Borrowed', '', ''];

const Books = () => {
  const data = [
    {
      BID: '1',
      ISBN: '12345',
      Name: 'Tôi thấy hoa vàng trên cỏ xanh',
      Author: 'Nguyễn Nhật Ánh',
      Publisher: 'NXB Trẻ',
      PublishYear: 2010,
      Genre: 'Fiction',
      Price: 125000,
      Quantity: 20,
      Borrowed: 0,
      Photo: '',
      Description: 'Tôi thấy hoa vàng trên cỏ xanh” truyện dài mới nhất của nhà văn vừa nhận giải văn chương ASEAN Nguyễn Nhật Ánh - đã được Nhà xuất bản Trẻ mua tác quyền và giới thiệu đến độc giả cả nước. Cuốn sách viết về tuổi thơ nghèo khó ở một làng quê, bên cạnh đề tài tình yêu quen thuộc, lần đầu tiên Nguyễn Nhật Ánh đưa vào tác phẩm của mình những nhân vật phản diện và đặt ra vấn đề đạo đức như sự vô tâm, cái ác. 81 chương ngắn là 81 câu chuyện nhỏ của những đứa trẻ xảy ra ở một ngôi làng: chuyện về con cóc Cậu trời, chuyện ma, chuyện công chúa và hoàng tử, bên cạnh chuyện đói ăn, cháy nhà, lụt lội,... “Tôi thấy hoa vàng trên cỏ xanh” hứa hẹn đem đến những điều thú vị với cả bạn đọc nhỏ tuổi và người lớn bằng giọng văn trong sáng, hồn nhiên, giản dị của trẻ con cùng nhiều tình tiết thú vị, bất ngờ và cảm động trong suốt hơn 300 trang sách. Cuốn sách, vì thế có sức ám ảnh, thu hút, hấp dẫn không thể bỏ qua.',
    },
    {
      BID: '2',
      ISBN: '12346',
      Name: 'hoa vàng',
      Author: 'Nguyễn Nhật Ánh',
      Publisher: 'NXB Trẻ',
      PublishYear: 2010,
      Genre: 'Thriller',
      Price: 125000,
      Quantity: 20,
      Borrowed: 0,
      Photo: '',
      Description: '',
    },
    {
      BID: '3',
      ISBN: '12347',
      Name: 'cỏ xanh',
      Author: 'Nguyễn Nhật Ánh',
      Publisher: 'NXB Trẻ',
      PublishYear: 2010,
      Genre: 'Romance',
      Price: 125000,
      Quantity: 20,
      Borrowed: 0,
      Photo: '',
      Description: '',
    },
    {
      BID: '4',
      ISBN: '12348',
      Name: 'Tôi thấy',
      Author: 'Nguyễn Nhật Ánh',
      Publisher: 'NXB Trẻ',
      PublishYear: 2010,
      Genre: 'Fiction',
      Price: 125000,
      Quantity: 20,
      Borrowed: 0,
      Photo: '',
      Description: '',
    },
    {
      BID: '5',
      ISBN: '12349',
      Name: 'Tôi thấy',
      Author: 'Nguyễn Nhật Ánh',
      Publisher: 'NXB Trẻ',
      PublishYear: 2010,
      Genre: 'Fiction',
      Price: 125000,
      Quantity: 20,
      Borrowed: 0,
      Photo: '',
      Description: '',
    },
    {
      BID: '6',
      ISBN: '12350',
      Name: 'Tôi thấy',
      Author: 'Nguyễn Nhật Ánh',
      Publisher: 'NXB Trẻ',
      PublishYear: 2010,
      Genre: 'Romance',
      Price: 125000,
      Quantity: 20,
      Borrowed: 0,
      Photo: '',
      Description: '',
    },
    {
      BID: '7',
      ISBN: '12351',
      Name: 'Tôi thấy',
      Author: 'Nguyễn Nhật Ánh',
      Publisher: 'NXB Trẻ',
      PublishYear: 2010,
      Genre: 'Fiction',
      Price: 125000,
      Quantity: 20,
      Borrowed: 0,
      Photo: '',
      Description: '',
    },
    {
      BID: '8',
      ISBN: '12352',
      Name: 'Tôi thấy',
      Author: 'Nguyễn Nhật Ánh',
      Publisher: 'NXB Trẻ',
      PublishYear: 2010,
      Genre: 'Thriller',
      Price: 125000,
      Quantity: 20,
      Borrowed: 0,
      Photo: '',
      Description: '',
    },
  ]
  const [bookData, setBookData] = useState(data)

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const numPage = Math.ceil(bookData.length / recordsPerPage);
  const lastIdx = currentPage * recordsPerPage;
  const firstIdx = lastIdx - recordsPerPage;
  const records = bookData.slice(firstIdx, lastIdx);

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

  const filterSearch = ['Name', 'ISBN', 'Author', 'Publisher', 'Genre']
  const [selectedFilter, setSelectedFilter] = useState(filterSearch[0]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === '') {
      setBookData(data);
      return;
    }
    const searchedBooks = data.filter((book) => book[selectedFilter].toLowerCase().includes(searchTerm.toLowerCase()));
    setBookData(searchedBooks);
  }

  const {showAddBook, showUpdateBook, showDeleteBook, updatedBook } = useSelector(state => state.book);
  const dispatch = useDispatch();

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
            {records.map((record) => (
              <tr key={record.BID} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                <td className="p-2 w-12 h-12">
                  {!record.Photo ?
                  <BiBookOpen className='w-full h-full' /> :
                  <img src={record.Photo} alt="logo" className="w-full h-full rounded-full object-contain" />
                  }
                </td>
                <td className="p-2">
                  <p>{record.ISBN}</p>
                </td>
                <td className="p-2">
                  <p>{record.Name}</p>
                </td>
                <td className="p-2">
                  <p>{record.Author}</p>
                </td>
                <td className="p-2">
                  <p>{record.Publisher}</p>
                </td>
                <td className="p-2">
                  <p>{record.PublishYear}</p>
                </td>
                <td className="p-2">
                  <p>{record.Genre}</p>
                </td>
                <td className="p-2">
                  <p>{record.Price}</p>
                </td>
                <td className="p-2">
                  <p>{record.Quantity}</p>
                </td>
                <td className="p-2">
                  <p>{record.Borrowed}</p>
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