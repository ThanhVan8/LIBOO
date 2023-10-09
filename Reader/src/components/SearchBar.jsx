import React, {useState} from "react";
import { BiSearch, BiChevronDown } from "react-icons/bi";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import book from '../assets/book.png'
import { Link } from "react-router-dom";


const SearchBar = ({data}) => {
  const filters = ['ISBN', 'name']

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [openMenu, setOpenMenu] = useState(false);

  const [bookList, setBookList] = useState([]);

  const handleSearchBook = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === '') {
      setBookList([]);
      return;
    }
    const searchedBooks = data.filter((book) => book[selectedFilter].toLowerCase().includes(searchTerm.toLowerCase()));
    setBookList(searchedBooks);
  }

  return (
    <div>
      <div className="flex w-full sm:w-[23rem]">
        <Menu placement="bottom-start" open={openMenu} handler={setOpenMenu}>
          <MenuHandler>
            <Button
              ripple={false}
              variant="text"
              color="blue-gray"
              className="flex justify-between w-fit h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 px-3"
            >
              {selectedFilter}
              <BiChevronDown size='1.3rem' className={`transition-transform ${
                openMenu ? "rotate-180" : ""}`} />
            </Button>
          </MenuHandler>
          <MenuList className="max-h-[20rem] max-w-[18rem]">
            {filters.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  value={item}
                  className="flex items-center gap-2"
                  onClick={() => setSelectedFilter(item)}
                >
                  {item}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
        <div className='w-full relative'>
          <Input
            type="text"
            placeholder="Search..."
            className="w-full rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleSearchBook}
            icon={<BiSearch size='1.2rem' />}
          />
          {bookList?.length !== 0 &&
            <div className='z-50 w-full h-fit absolute top-12 space-y-2 bg-white border-blue-gray-200 border-[1.2px] rounded-md px-1.5 py-2 overflow-auto'>
              {bookList.map((item) => (
                <>
                <Link key={item._id} to={`/Catalog/${item._id}`} className='flex w-full h-fit gap-2'>
                  <img src={item.photo} alt='book' className='w-10 h-10 object-cover' />
                  <p>{item.name}</p>
                </Link>
                <hr />
                </>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default SearchBar;