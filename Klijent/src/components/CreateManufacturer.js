import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateManufacturer = () => {
  const [manufacturerData, setManufacturerData] = useState({
    name: '',
    location: '',
    description: '',
    foundedYear: '',  
    country: '',      
    logoUrl: ''    
  });
  const history = useHistory();

  const handleChange = (e) => {
    setManufacturerData({ ...manufacturerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');  
  
    fetch('http://localhost:4000/manufacturers', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
      },
      body: JSON.stringify(manufacturerData),
    })
    .then(response => {
      if (!response.ok && (response.status === 401 || response.status === 403)) {
        throw new Error('Unauthorized or Forbidden');
      }
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(() => history.push('/manufacturers'))
    .catch(error => {
      console.error('Error creating manufacturer:', error);
      if (error.message === 'Unauthorized or Forbidden') {
        history.push('/login');
      }
    });
  };
  return (
    <div className="card">
      <h2>Create Manufacturer</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Name</label>
        <input type="text" name="name" value={manufacturerData.name} onChange={handleChange} placeholder="Name" required />
        
        <label>Location</label>
        <input type="text" name="location" value={manufacturerData.location} onChange={handleChange} placeholder="Location" required />
        
        <label>Description</label>
        <textarea name="description" value={manufacturerData.description} onChange={handleChange} placeholder="Description" required></textarea>
        
        <label>Founded Year</label>
        <input type="number" name="foundedYear" value={manufacturerData.foundedYear} onChange={handleChange} placeholder="Founded Year" />
        
        <label>Country</label>
        <input type="text" name="country" value={manufacturerData.country} onChange={handleChange} placeholder="Country" />
        
        <label>Logo URL</label>
        <input type="text" name="logoUrl" value={manufacturerData.logoUrl} onChange={handleChange} placeholder="Logo URL" />
        
        <button type="submit">Create Manufacturer</button>
      </form>
    </div>
  );
};

export default CreateManufacturer;
