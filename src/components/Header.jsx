import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Book, Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <NavLink to="/" className="logo">
            <Book size={28} />
            <span>EduLearn</span>
          </NavLink>

          {isAuthenticated() && (
            <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Home
              </NavLink>
              <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Courses
              </NavLink>
              <NavLink to="/students" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Students
              </NavLink>
              <NavLink to="/enroll" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Enroll
              </NavLink>
            </nav>
          )}

          <div className="header-actions">
            {isAuthenticated() ? (
              <div className="user-menu">
                <div className="user-info">
                  <User size={20} />
                  <span className="user-name">{user?.name}</span>
                </div>
                <button
                  className="btn btn-outline logout-btn"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="btn btn-primary">
                Login
              </NavLink>
            )}

            {isAuthenticated() && (
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
