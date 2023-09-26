import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Auth from './pages/Auth'

const App = () => {
  return (
    <div className="w-screen h-screen flex">
      <Routes>
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;