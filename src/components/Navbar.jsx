import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Get role and email from localStorage
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");
    setUserRole(role);
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      )}
      
      {/* Sidebar Navigation */}
      <div className={`sidebar ${isMenuOpen ? 'mobile-open' : ''}`}>
        {/* Logo/Brand Section */}
        <div className="brand-section">
          <div className="brand-logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div className="brand-text">
              <h1>MediCare</h1>
              <span>Healthcare System</span>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="user-section">
          <div className="user-profile" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div className="user-avatar">
              <span>{userRole?.[0]?.toUpperCase()}</span>
              <div className="status-indicator online"></div>
            </div>
            <div className="user-details">
              <div className="user-email">{userEmail || 'Guest User'}</div>
              <div className="user-role">{userRole || 'No Role'}</div>
            </div>
            <div className="profile-toggle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          
          {/* Profile Dropdown */}
          <div className={`profile-dropdown ${isProfileOpen ? 'open' : ''}`}>
            <button className="profile-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile Settings
            </button>
            <button className="profile-item logout-btn" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="navigation">
          <div className="nav-section-title">Main Menu</div>
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </span>
                <span className="nav-text">Dashboard</span>
                <span className="nav-badge">New</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/services" className="nav-link">
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </span>
                <span className="nav-text">Services</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/transactions" className="nav-link">
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </span>
                <span className="nav-text">Point of Sale</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/receipts" className="nav-link">
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </span>
                <span className="nav-text">Receipts</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/reports" className="nav-link">
                <span className="nav-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </span>
                <span className="nav-text">Expense History</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="sidebar-footer">
          <div className="footer-info">
            <span className="version">v2.0.1</span>
            <span className="separator">•</span>
            <span className="status">System Online</span>
          </div>
        </div>
      </div>
      
      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div 
          className="overlay" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
