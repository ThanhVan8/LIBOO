import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Auth from './pages/Auth'

const App = () => {
  return (
    <div className="w-full h-screen">
      <Routes>
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;