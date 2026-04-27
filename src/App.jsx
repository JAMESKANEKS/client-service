import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Receipts from "./pages/Receipts";
import Receipt from './pages/Receipt'; // 👈 Added import
import Login from "./pages/Login";

// Styles
import "./styles/layout.css";
import "./App.css";

// Images
import logo from "./images/logo.png";

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const role = localStorage.getItem("userRole");
  return role ? children : <Navigate to="/login" />;
}

// Header Component
function Header() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const path = location.pathname;
    const titles = {
      '/': 'Dashboard',
      '/dashboard': 'Dashboard',
      '/services': 'Services Management',
      '/transactions': 'Point of Sale',
      '/reports': 'Expense History',
      '/receipts': 'Receipts Management'
    };

    setPageTitle(titles[path] || 'Dashboard');
  }, [location]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <div className="page-title-section">
            <h1 className="page-title">{pageTitle}</h1>
            <p className="page-subtitle">Manage your healthcare operations efficiently</p>
          </div>
        </div>
        
        <div className="header-right">
          <div className="header-info">
            <div className="datetime-display">
              <div className="time">{formatTime(currentTime)}</div>
              <div className="date">{formatDate(currentTime)}</div>
            </div>
            
            <div className="user-info-header">
              <div className="user-avatar-header">
                <span>{userEmail?.[0]?.toUpperCase() || 'U'}</span>
              </div>
              <div className="user-details-header">
                <div className="user-email-header">{userEmail || 'Guest User'}</div>
                <div className="user-status">Active</div>
              </div>
            </div>
            
            <button className="header-notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-dot"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function MainLayout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <Header />
      <main className="main-content">
        <div className="page-container">{children}</div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route path="/" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><MainLayout><Services /></MainLayout></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><MainLayout><Transactions /></MainLayout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><MainLayout><Reports /></MainLayout></ProtectedRoute>} />
        <Route path="/receipts" element={<ProtectedRoute><MainLayout><Receipts /></MainLayout></ProtectedRoute>} />

        {/* 👇 New Receipt Route */}
        <Route path="/receipt/:id" element={<ProtectedRoute><Receipt /></ProtectedRoute>} />

        {/* Redirect unknown */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
