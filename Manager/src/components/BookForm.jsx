import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setShowAddBook, setShowUpdateBook, setUpdatedBook } from '../slices/bookSlice';
import { BiX, BiBookOpen } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { Input, Textarea } from "@material-tailwind/react";
import CustomButton from "./CustomButton";
import { addBook, updateBook } from "../slices/requestApi";

const BookForm = () => {
  const {showAddBook, showUpdateBook, updatedBook} = useSelector(state => state.book);
  const user = useSelector((state) => state.auth.login?.currentUser);

  const [book, setBook] = useState(
    !updatedBook ? 
    {
      ISBN: '',
      name: '',
      author: '',
      publisher: '',
      publishYear: 0,
      genre: [],
      price: 0,
      quantity: 1,
      borrowed: 0,
      image: '',
      description: '',
    } :
    updatedBook
  );

  const [tempGenre, setTempGenre] = useState(book.genre.join(', '));

  const dispatch = useDispatch();

  const closeForm = () => {
    if (showAddBook) {
      dispatch(setShowAddBook());
    } else if (showUpdateBook) {
      dispatch(setShowUpdateBook());
      dispatch(setUpdatedBook(null));
    }
  }

  const changePhoto = (e) => {
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setBook({...book, image: reader.result});
      if(showAddBook){
        addBook({...book, image: reader.result}, user?.accessToken, dispatch);
      }
      if(showUpdateBook){
        updateBook({...book, image: reader.result}, book._id, user?.accessToken, dispatch);
      }
      console.log(book.image);
    }
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    if (name === 'genre') {
      setTempGenre(value);
      setBook({...book, genre: value.split(',').map((item) => item.trim())});
    }
    else {
      setBook({...book, [name]: value});
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (showAddBook){
      addBook(book, user?.accessToken, dispatch);
    }
    if (showUpdateBook){
      updateBook(book, book._id, user?.accessToken, dispatch);
    }
    closeForm();
  }

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-25 w-full h-full flex justify-center items-center z-50 overflow-auto ">
      <form
        className="relative bg-white drop-shadow-md p-5 w-full h-full md:w-[30rem] md:h-fit flex flex-col justify-center gap-4 rounded-lg"
        onSubmit={handleSubmit}
      >
        <button
          className="absolute top-3 right-3 w-6 h-6 bg-lightGrey rounded-full"
          onClick={closeForm}
        >
          <BiX size="1.5rem" />
        </button>
        <h1 className="text-2xl font-semibold text-left">{showAddBook ? 'Add' : 'Update'} Book</h1>
        <div className="relative w-16 h-16">
          {!book.image ? 
          <BiBookOpen className='w-full h-full' /> :
          <img src={book.image} alt="upload" className="object-cover w-full h-full rounded-full" />
          }
          <div
            className="absolute bottom-2 right-1 w-5 h-5 rounded-full bg-red flex items-center justify-center"
          >
            <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={changePhoto} />
            <MdEdit className="text-white hover:cursor-pointer" onClick={() => document.querySelector('input[type="file"]').click()} />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
          <Input
            variant="standard"
            label="ISBN-13"
            required
            name="ISBN"
            value={book.ISBN}
            onInput={(e) =>
              (e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1"))
            }
            pattern=".{13}"
            maxLength={13}
            onChange={handleChangeInfo}
          />
          <Input
            variant="standard"
            label="Name"
            required
            onChange={handleChangeInfo}
            name="name"
            value={book.name}
          />
          <Input
            variant="standard"
            label="Author"
            required
            onChange={handleChangeInfo}
            name="author"
            value={book.author}
          />
          <Input
            variant="standard"
            label="Genre"
            required
            onChange={handleChangeInfo}
            value={tempGenre}
            name="genre"
          />
          <Input
            variant="standard"
            label="Publisher"
            required
            onChange={handleChangeInfo}
            name="publisher"
            value={book.publisher}
          />
          <Input
            variant="standard"
            label="Publish Year"
            required
            onChange={handleChangeInfo}
            name="publishYear"
            value={book.publishYear}
            type="number" 
            min="1000" 
            max="9999" 
            step="1"
          />
          <Input
            variant="standard"
            label="Quantity"
            required
            onChange={handleChangeInfo}
            value={book.quantity}
            name="quantity"
            type="number"
            min={1}
          />
          <Input
            variant="standard"
            label="Price"
            required
            onChange={handleChangeInfo}
            value={book.price}
            name="price"
            type="number"
            min={0}
          />
          <div className='md:col-span-2'>
            <Textarea 
              variant="outlined" 
              label="Description"
              onChange={handleChangeInfo}
              name="description"
              value={book.description}
              required
            />
          </div>
        </div>

        <div className="flex justify-center">
          <CustomButton label="Save changes" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default BookForm;
