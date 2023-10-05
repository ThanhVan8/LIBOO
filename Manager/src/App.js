import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import PrivateRoute from './routers/PrivateRoute';
import Auth from './pages/Auth'
import Readers from './pages/Readers';
import Books from './pages/Books';
import MenuSidebar from './components/MenuSidebar';
import Borrow from './pages/Borrow';
import Return from './pages/Return';
import Statistics from './pages/Statistics';
import {useDispatch, useSelector} from 'react-redux';
import { getAllBooks,  getAllUsers} from './slices/requestApi';

const App = () => {
  const {toggle} = useSelector(state => state.menu);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const readerList = useSelector((state) => state.reader.readers?.allUsers);
  const bookList = useSelector((state) => state.book.books?.allBooks);

  const dispatch = useDispatch();

  useEffect(() => {
    if(user?.accessToken){
      getAllBooks(user?.accessToken, dispatch);
      getAllUsers(user?.accessToken, dispatch);
    }
  }, [])
  
  return (
    <div className="w-screen h-screen flex">
      <MenuSidebar />
        <div className={`${toggle ? 'ml-[12.875rem]' : ''} w-full h-full overflow-auto`}>
        <Routes>
          <Route path="/Auth" element={<Auth />} />
          <Route element={<PrivateRoute />} >
            <Route path="/" element={<Readers />} />
            <Route path="/Books" element={<Books />} />
            <Route path="/Borrow" element={<Borrow />} />
            <Route path="/Return" element={<Return />} />
            <Route path="/Statistics" element={<Statistics />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;