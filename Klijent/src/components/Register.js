import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          history.push('/login');
        } else {
          setError('Registration failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        setError('Registration failed. Please try again.');
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username" />
        <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
