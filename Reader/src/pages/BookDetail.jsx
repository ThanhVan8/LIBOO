import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import book from '../assets/book.png'
import SearchBar from '../components/SearchBar'
import CustomButton from '../components/CustomButton'
import {BiChevronUp, BiChevronDown} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";

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

const bookDetail =
{
  "_id": "651e43952dac9ea3a6b6e93a",
  "ISBN": "1234567890001",
  "name": "Kính vạn hoa",
  "author": "Nguyễn Nhật Ánh",
  "publisher": "NXB Kim Đồng ",
  "publishYear": 2000,
  "description": "\"Tôi thấy hoa vàng trên cỏ xanh\" truyện dài mới nhất của nhà văn vừa nhận giải văn chương ASEAN Nguyễn Nhật Ánh - đã được Nhà xuất bản Trẻ mua tác quyền và giới thiệu đến độc giả cả nước. Cuốn sách viết về tuổi thơ nghèo khó ở một làng quê, bên cạnh đề tài tình yêu quen thuộc, lần đầu tiên Nguyễn Nhật Ánh đưa vào tác phẩm của mình những nhân vật phản diện và đặt ra vấn đề đạo đức như sự vô tâm, cái ác. 81 chương ngắn là 81 câu chuyện nhỏ của những đứa trẻ xảy ra ở một ngôi làng: chuyện về con cóc Cậu trời, chuyện ma, chuyện công chúa và hoàng tử, bên cạnh chuyện đói ăn, cháy nhà, lụt lội,... “Tôi thấy hoa vàng trên cỏ xanh” hứa hẹn đem đến những điều thú vị với cả bạn đọc nhỏ tuổi và người lớn bằng giọng văn trong sáng, hồn nhiên, giản dị của trẻ con cùng nhiều tình tiết thú vị, bất ngờ và cảm động trong suốt hơn 300 trang sách. Cuốn sách, vì thế có sức ám ảnh, thu hút, hấp dẫn không thể bỏ qua.",
  "genre": [
    "Truyện ngắn",
    "Tình cảm"
  ],
  "price": 200000,
  "quantity": 20,
  "borrowed": 18,
  "__v": 0,
  "photo": book,
}

const BookDetail = () => {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const gotoBorrow = () => {
    navigate(`/Borrow/${id}`)
  }

  return (
    <div className='w-full h-full space-y-3'>
      <div className='flex justify-end'>
        <SearchBar data={data} />
      </div>
      <div className='w-full flex gap-4 h-fit'>
        <img src={bookDetail.photo} alt="book" className='w-40 h-auto object-contain place-self-start shrink-0' />
        
        {/* Detail */}
        <div className='space-y-2'>
          <h1 className='text-2xl font-semibold'>{bookDetail.name}</h1>
          <p className='text-lg'>ISBN: <span className='font-medium text-red'>{bookDetail.ISBN}</span></p>
          <p> Author: {bookDetail.author} </p>
          <p> Publisher: {bookDetail.publisher} </p>
          <p> Publish year: {bookDetail.publishYear} </p>
          <p> Genre: {bookDetail.genre.join(', ')} </p>
          <p> Price: {bookDetail.price} VND </p>
          <div>
            <p className='font-medium'>Description:</p>
            <p className={`text-justify ${expanded ? 'line-clamp-none' : 'line-clamp-4'}`}>{bookDetail.description}</p>
            <button
              onClick={() => setExpanded(!expanded)}
              className='space-x-1'
            >
              <span className='text-red'>{expanded ? 'Read less' : 'Read more'}</span>
              {expanded ? <BiChevronUp size='1rem' color='var(--my-red)' className='inline-block' /> : <BiChevronDown size='1rem' color='var(--my-red)' className='inline-block' />}
            </button>
          </div>
        </div>

        {/* Note */}
        <div className='w-full h-fit border-2 border-lightGrey rounded-md px-4 py-2 space-y-3'>
          <p className='text-lg font-medium'>{bookDetail.borrowed < bookDetail.quantity ? 
            <span className='text-available'>Available</span> : 
            <span className='text-unavailable'>Not available</span>}
          </p>
          <p>Amount: <span className='font-medium'>{bookDetail.quantity}</span></p>
          <p>Available: <span className='font-medium'>{bookDetail.quantity - bookDetail.borrowed}</span></p>
          <CustomButton label='Borrow' classes='self-center w-[12rem]' disabled={bookDetail.borrowed >= bookDetail.quantity} onClick={gotoBorrow} />
        </div>
      </div>
    </div>
  )
}

export default BookDetail