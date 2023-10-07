import React from 'react';
import {Route, Routes} from 'react-router-dom'
import PrivateRoute from './routers/PrivateRoute';
import Auth from './pages/Auth'
import Home from './pages/Home';
import Menu from './components/Menu'
import Catalog from './pages/Catalog';
import {useSelector} from 'react-redux';

const App = () => {
  const toggle = useSelector(state => state.menu.toggle);
  return (
    <div className="w-screen h-screen flex overflow-auto">
      <Menu />
      <div className={`${toggle ? 'ml-[12.875rem]' : ''} w-full h-full my-2 mr-4 pl-3`}>
        <Routes>
          <Route path="/Auth" element={<Auth />} />
          <Route element={<PrivateRoute />} >
            <Route path="/" element={<Home />} />
            <Route path="/Catalog" element={<Catalog />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;