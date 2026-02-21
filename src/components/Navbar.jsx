import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar-wrap">
      <nav className="navbar container">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-mark">S</span>
          SmartMove
        </Link>

        <button
          className="menu-btn"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/cars" onClick={closeMenu}>
            Cars
          </NavLink>
          {token && (
            <NavLink to="/bookings" onClick={closeMenu}>
              My Bookings
            </NavLink>
          )}
        </div>

        <div className={`nav-actions ${menuOpen ? 'open' : ''}`}>
          {token ? (
            <Link className="btn btn-outline" to="/profile" onClick={closeMenu}>
              {user?.name ? user.name.split(' ')[0] : 'Profile'}
            </Link>
          ) : (
            <>
              <Link className="btn btn-outline" to="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link className="btn" to="/register" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
