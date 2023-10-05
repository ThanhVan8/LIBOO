import React from 'react';
import {Route, Routes} from 'react-router-dom'
import PrivateRoute from './routers/PrivateRoute';
import Auth from './pages/Auth'
import Readers from './pages/Readers';
import Books from './pages/Books';
import MenuSidebar from './components/MenuSidebar';
import Borrow from './pages/Borrow';
import Return from './pages/Return';
import Statistics from './pages/Statistics';

const App = () => {
  return (
    <div className="w-screen h-screen flex">
      <MenuSidebar />
      
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
  );
}

export default App;