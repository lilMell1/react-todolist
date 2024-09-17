import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainApp from '../src/MainApp';  // Main app component
import './App.css'; // Ensure the correct path to your CSS file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<MainApp/>} />  {/* MainApp now expects userId via navigate */}
      </Routes>
    </Router>
  );
}

export default App;
