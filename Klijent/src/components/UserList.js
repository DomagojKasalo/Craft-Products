import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="user-list">
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <Link to={`/user-details/${user._id}`}>{user.username}</Link>
            <Link to={`/edit-user/${user._id}`}>  Edit</Link>
            <Link to={`/change-password/${user._id}`}>  Change Password</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
