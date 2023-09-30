import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home';

const App = () => {
  return (
    <div className="w-screen h-screen flex">
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;