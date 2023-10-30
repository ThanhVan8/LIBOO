import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {useSelector} from 'react-redux';
import PrivateRoute from './routers/PrivateRoute';
import Auth from './pages/Auth'
import Home from './pages/Home';
import Menu from './components/Menu'
import Catalog from './pages/Catalog';
import BookDetail from './pages/BookDetail';
import Borrow from './pages/Borrow';
import Profile from './pages/Profile';
import Rules from './pages/Rules';

const App = () => {
  const toggle = useSelector(state => state.menu.toggle);
  return (
    <div className="w-screen h-screen flex overflow-auto">
      <Menu />
      <div className={`${toggle ? 'ml-[12.875rem]' : ''} w-full h-full`}>
        <Routes>
          <Route path="/Auth" element={<Auth />} />
          <Route element={<PrivateRoute />} >
            <Route path="/" element={<Home />} />
            <Route path="/Catalog" element={<Catalog />} />
            <Route path="/Catalog/:id" element={<BookDetail />} />
            <Route path='/Borrow' element={<Borrow />}>
              <Route path='/Borrow/:id' element={<Borrow />} />
            </Route>
            <Route path='/Myaccount' element={<Profile />} />
            <Route path='/rules' element={<Rules />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;