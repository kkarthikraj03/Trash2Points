import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Form from './components/Form';
import Leaderboard from './components/Leaderboard';
import MainPage from './components/MainPage';
import Contact from './components/Contact';
import Home from './components/Home';

function App() {

  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <BrowserRouter>
        {/* Render Navbar for all routes except /home */}
        {window.location.pathname !== '/home' && (
          <Navbar user={user} handleLogout={handleLogout} />
        )}

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/form" element={<Form />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App





