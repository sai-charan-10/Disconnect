
import './App.css';
import React from 'react';
import Display from './pages/Display';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Logout from './pages/Logout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
