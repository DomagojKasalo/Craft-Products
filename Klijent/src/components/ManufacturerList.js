import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ManufacturerList = () => {
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/manufacturers', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or Forbidden');
      }
      return response.json();
    })
    .then(data => setManufacturers(data))
    .catch(error => {
      console.error('Error fetching manufacturers:', error);
      if (error.message === 'Unauthorized or Forbidden') {
        history.push('/login');
      }
    });
  }, [history]);

  const deleteManufacturer = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:4000/manufacturers/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      if (response.ok) {
        setManufacturers(manufacturers.filter(manufacturer => manufacturer._id !== id));
      } else {
        response.json().then(data => {
          alert(data.message); 
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while deleting the manufacturer.');
    });
  };
  

  const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.role === 'admin';
    }
    return false;
  };

  return (
    <div className="manufacturer-list card">
      <h2>Manufacturers</h2>
      {isAdmin() && <Link to="/create-manufacturer" className="button add-button">Add New Manufacturer</Link>}
      <ul className="list">
        {manufacturers.map(manufacturer => (
          <li key={manufacturer._id} className="list-item">
            <div className="manufacturer-info">
              <h3>{manufacturer.name}</h3>
              <p>{manufacturer.description}</p>
            </div>
            {isAdmin() && (
              <div className="actions">
                <Link to={`/manufacturer/${manufacturer._id}`} className="button detail-button">Details</Link>
                <button onClick={() => deleteManufacturer(manufacturer._id)} className="button button-danger">Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManufacturerList;
