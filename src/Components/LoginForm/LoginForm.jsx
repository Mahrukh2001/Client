import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './LoginForm.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the login API with form data
      const response = await axios.post('http://172.25.1.20:3000/login', formData);
      
   
      if (response.data.token && response.data.userTypeId) {
       
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);

       
        if (response.data.userTypeId === 1) {
         
          navigate('/admin/visitors');
        } else if (response.data.userTypeId === 2) {
          
          navigate('/employee/employeeData');
        } else {
          
          navigate('/dashboard'); 
        }
      } else {
       
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      setErrorMessage('Error logging in. Please try again.');
      console.error('Login error', error);
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center login-title">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="password-wrapper" style={{ position: 'relative' }}>
                <Form.Control
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span 
                  onClick={togglePasswordVisibility} 
                  style={{
                    position: 'absolute', 
                    right: '10px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    cursor: 'pointer'
                  }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <Button variant="primary" type="submit" className="btn-block">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
