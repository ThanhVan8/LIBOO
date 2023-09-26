import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Auth from './pages/Auth'
import Readers from './pages/Readers';

const App = () => {
  return (
    <div className="w-screen h-screen flex">
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        <Route path="/" element={<Readers />} />
      </Routes>
    </div>
  );
}

export default App;