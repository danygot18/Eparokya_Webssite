import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS
import { authenticate } from '../../Utils/helpers'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      // Send login request
      const { data } = await axios.post(
        `http://localhost:4001/api/v1/login`,
        { email, password },
        config
      );console.log("ayaw")

      // Check if login was successful
      if (data.success) {
        // Call authenticate function if it's defined
        authenticate(data, () => navigate("/"));
        toast.success('Logged in successfully', {
          position: "top-right",
        });
      } else {
        // Show error toast if login failed on the backend
        toast.error(data.message || 'Invalid email or password', {
          position: "top-right",
        });
      }
    } catch (error) {
        console.log(error)
      // Show error toast if there was a network or server issue
      toast.error('An error occurred. Please try again later.', {
        position: "top-right",
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div style={styles.container}>
      <ToastContainer /> 
      <div style={styles.loginBox}>
        <h2 className="mb-4">Login</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox" style={styles.checkboxGroup}>
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>

          <Form.Group>
            <Link to="" style={styles.forgotPasswordLink}>
              Forgot Password?
            </Link>
          </Form.Group>

          <Button
            variant="dark"
            className="mt-4 btn-block py-2 px-4"
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    height: '400vh',
    backgroundColor: '#e9ecef',
  },
  loginBox: {
    backgroundColor: '#ffffff',
    padding: '40px 30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    height: '300px',
    textAlign: 'center',
  },
  input: {
    padding: '12px',
    marginLeft: '9px',
    marginTop: '2px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ced4da',
  },
  checkboxGroup: {
    textAlign: 'left',
    marginBottom: '15px',
  },
  forgotPasswordLink: {
    color: '#007bff',
    float: 'right',
    textDecoration: 'none',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#343a40',
    border: 'none',
    borderRadius: '8px',
  },
};
