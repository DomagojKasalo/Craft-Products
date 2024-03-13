import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:4000/users/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(error => console.error('Error fetching user details:', error));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-details">
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default UserDetails;