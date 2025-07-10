import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './index.css';
import PrivateRoute from './utils/privateRoute.jsx'
import Scan from './pages/Scan.jsx';
import PreviousScans from './pages/PreviousScans';
import Settings from './pages/Settings.jsx';
import Documentation from './pages/Documentation.jsx';
import Feedback from './pages/Feedback.jsx';
import DashboardLayout from './layout/DashboardLayout.jsx';
import Register from './pages/Register.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        } >
          <Route index element={<Dashboard />} />
          <Route path="scan" element={<Scan />} />
          <Route path="docs" element={<Documentation />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="previous-scans" element={<PreviousScans />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<div className="text-center mt-20 text-2xl">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
