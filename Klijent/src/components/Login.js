import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.js'; 

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const history = useHistory();
  const { updateAuthStatus } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
      .then(async (response) => {
        const data = await response.json();
        console.log("data", data);
        if (response.ok) {
          localStorage.setItem('token', data.token);
          updateAuthStatus(true, data.token);
          history.push('/');
        } else {
          console.error('Login failed:');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
};

export default Login;
