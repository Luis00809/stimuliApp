import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

import Homepage from './pages/HomePage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { LoginPage } from './pages/Login.jsx';
import ClientPage from './pages/ClientPage.jsx';
import TrialPage from './pages/TrialPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/:id/client" element={<ClientPage />} />
      <Route path="/:id/trial" element={<TrialPage />} />
    </Routes>
 </BrowserRouter>
);
