import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Auth from './pages/Auth';

function App() {
  return (
    <div className="main-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App
