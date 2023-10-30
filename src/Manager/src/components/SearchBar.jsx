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

const SearchBar = ({filters, onClick, onChange}) => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [openMenu, setOpenMenu] = useState(false);

  return (
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
        <MenuList className="max-h-[20rem] max-w-[18rem]" onClick={onClick}>
          {filters.map((item, index) => {
            return (
              <MenuItem
                key={index}
                value={item}
                className="flex items-center gap-2"
                onClick={() => setSelectedFilter(item)}
              >
                <p className='capitalize'>{item}</p>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <Input
        type="text"
        placeholder="Search..."
        className="w-full rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        onChange={onChange}
        icon={<BiSearch size='1.2rem' />}
      />
    </div>
  );
};

export default SearchBar;