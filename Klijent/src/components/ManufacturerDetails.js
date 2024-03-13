import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ManufacturerDetails = () => {
  const [manufacturer, setManufacturer] = useState(null);
  const { id } = useParams();

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
    .then(data => setManufacturer(data))
    .catch(error => {
      console.error('Error fetching manufacturer details:', error);
      if (error.message === 'Unauthorized or Forbidden') {
        history.push('/login');
      }
    });
  }, [id, history]);

  if (!manufacturer) return <div>Loading...</div>;
  
  return (
    <div className="manufacturer-details card">
      {manufacturer ? (
        <>
          <h2 className="manufacturer-title">{manufacturer.name}</h2>
          <div className="manufacturer-info">
            <p><strong>Location:</strong> {manufacturer.location}</p>
            <p><strong>Description:</strong> {manufacturer.description}</p>
            <p><strong>Founded Year:</strong> {manufacturer.foundedYear}</p>
            <p><strong>Country:</strong> {manufacturer.country}</p>
            {/* {manufacturer.logoUrl && (
              <img src={manufacturer.logoUrl} alt={`${manufacturer.name} logo`} className="manufacturer-logo" />
            )} */}
          </div>
          <div className="actions">
            <Link to={`/edit-manufacturer/${id}`} className="button">Edit Manufacturer</Link>
            <Link to="/manufacturers" className="button">Back to List</Link>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
};  

export default ManufacturerDetails;
