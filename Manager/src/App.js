import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Auth from './pages/Auth'
import Readers from './pages/Readers';
import Books from './pages/Books';
import MenuSidebar from './components/MenuSidebar';

const App = () => {
  return (
    <div className="w-screen h-screen flex">
      <MenuSidebar />
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        <Route path="/" element={<Readers />} />
        <Route path="/Books" element={<Books />} />
      </Routes>
    </div>
  );
}

export default App;