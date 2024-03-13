import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditUser = () => {
  const [user, setUser] = useState({ username: '', email: '', role: '' });
  const { id } = useParams(); 
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:4000/users/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(error => console.error('Error fetching user:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch(`http://localhost:4000/users/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
    .then(() => {
      history.push('/users'); 
    })
    .catch(error => console.error('Error updating user:', error));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            value={user.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={user.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Role</label>
          <select name="role" value={user.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
