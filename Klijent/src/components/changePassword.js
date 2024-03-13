import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext.js';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const history = useHistory();
  const { id } = useParams();

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/users/check-password/${id}`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
        return;
      }
  
      const changePasswordResponse = await fetch(`/users/change-password/${id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });
  
      if (changePasswordResponse.ok) {
        alert('Lozinka je uspješno promijenjena.');
        history.push('/users');
      }
    } catch (error) {
      console.error('Greška prilikom promjene lozinke:', error);
      alert('Greška prilikom promjene lozinke.');
    }
  };  

  return (
    <div className="change-password">
      <h2>Promijeni lozinku</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="oldPassword">Stara lozinka:</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">Nova lozinka:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit">Promijeni lozinku</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;