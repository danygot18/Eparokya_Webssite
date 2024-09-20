import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../Utils/helpers';
import Container from 'react-bootstrap/Container';
import { Button, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axios.get(`http://localhost:4001/api/v1/logout`);
      setUser('');
      logout(() => navigate('/'));
      toast.success('Logged out successfully', { position: "top-right" });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error during logout', { position: "top-right" });
    }
  };

  useEffect(() => {
    setUser(getUser()); // Fetch logged-in user info
  }, []);

  return (
    <Container style={styles.header}>
      {/* Logo Section */}
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          MyApp
        </Link>
      </div>

      {/* User Navigation Section */}
      {user ? (
        <Nav className="ml-4 dropdown d-inline">
          <NavDropdown title={user.name} className="btn dropdown-toggle text-white mr-4" style={{ height: "55px" }}>
            <Link to="/profile" className="text-dark dropdown-item" style={{ textDecoration: "none" }}>
              Profile
            </Link>
            {user.role === 'admin' && (
              <Link to="/dashboard" className="text-dark dropdown-item" style={{ textDecoration: "none" }}>
                Dashboard
              </Link>
            )}
            <Link to="/orders" className="text-dark dropdown-item" style={{ textDecoration: "none" }}>
              Orders
            </Link>
            <NavDropdown.Item className="dropdown-item text-danger" onClick={logoutUser}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      ) : (
        <div>
          <Link to="/login">
            <Button variant="outline-light" className="custom-font">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline-light" className="custom-font ml-2">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Header;

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1.5rem',
  },
};
