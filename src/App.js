import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OTPVerification from './components/OTPVerification';
import ManageBundle from './components/ManageBundle';
import Batches from './components/Batches';
import './styles/App.css'; // Ensure this path is correct

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/otp-verification" />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/manage-bundle" element={<ManageBundle />} />
          <Route path="/batches" element={<Batches />} />
        </Routes>
        <footer>
          <a href="https://chaicode.com" target="_blank" rel="noopener noreferrer">
            <img src="/logo.png" alt="Brand Logo" />
          </a>
        </footer>
      </div>
    </Router>
  );
};

export default App;
