import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const EditManufacturer = () => {
  const [manufacturerData, setManufacturerData] = useState({
    name: '',
    location: '',
    description: '',
    foundedYear: '',  
    country: '',      
    logoUrl: ''    
  });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    fetch(`http://localhost:4000/manufacturers/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or Forbidden');
      }
      return response.json();
    })
    .then(data => setManufacturerData(data))
    .catch(error => {
      console.error('Error fetching manufacturer:', error);
      if (error.message === 'Unauthorized or Forbidden') {
        history.push('/login');
      }
    });
  }, [id, history]);

  const handleChange = (e) => {
    setManufacturerData({ ...manufacturerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    fetch(`http://localhost:4000/manufacturers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(manufacturerData),
    })
    .then(response => {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or Forbidden');
      }
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(() => history.push('/manufacturers'))
    .catch(error => {
      console.error('Error updating manufacturer:', error);
      if (error.message === 'Unauthorized or Forbidden') {
        history.push('/login');
      }
    });
  };

  return (
    <div className="card">
      <h2>Edit Manufacturer</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Name</label>
        <input 
          type="text" 
          name="name" 
          value={manufacturerData.name} 
          onChange={handleChange} 
          placeholder="Name" 
          required 
        />
  
        <label>Location</label>
        <input 
          type="text" 
          name="location" 
          value={manufacturerData.location} 
          onChange={handleChange} 
          placeholder="Location" 
          required 
        />
  
        <label>Description</label>
        <textarea 
          name="description" 
          value={manufacturerData.description} 
          onChange={handleChange} 
          placeholder="Description"
        ></textarea>
  
        <label>Founded Year</label>
        <input 
          type="number" 
          name="foundedYear" 
          value={manufacturerData.foundedYear} 
          onChange={handleChange} 
          placeholder="Founded Year"
        />
  
        <label>Country</label>
        <input 
          type="text" 
          name="country" 
          value={manufacturerData.country} 
          onChange={handleChange} 
          placeholder="Country" 
        />
  
        <label>Logo URL</label>
        <input 
          type="text" 
          name="logoUrl" 
          value={manufacturerData.logoUrl} 
          onChange={handleChange} 
          placeholder="Logo URL" 
        />
  
        <button type="submit">Update Manufacturer</button>
      </form>
    </div>
  );
};

export default EditManufacturer;
