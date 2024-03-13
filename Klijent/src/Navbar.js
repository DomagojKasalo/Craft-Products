import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './components/AuthContext.js'; 
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const history = useHistory();
  const { isAuthenticated, updateAuthStatus } = useAuth();
  const { userRole } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    updateAuthStatus(false);
    history.push('/login');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/manufacturers">Manufacturers</Link>
        </li>
        {isAuthenticated && ( 
          <li>
            <Link to="/users">Users</Link> 
          </li>
        )}
        {isAuthenticated ? (
          <li onClick={handleLogout}>
            <span>Logout</span>
          </li>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
