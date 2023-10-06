import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home';
import PrivateRoute from './routers/PrivateRoute';

const App = () => {
  return (
    <div className="w-screen h-screen flex">
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        <Route element={<PrivateRoute />} >
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;