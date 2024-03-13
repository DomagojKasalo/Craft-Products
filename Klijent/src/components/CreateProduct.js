import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    alcoholPercentage: 0,
    ibu: 0,
    srm: 0,
    type: '',
    manufacturer: ''
  });
  const [manufacturers, setManufacturers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    fetch('http://localhost:4000/manufacturers', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      if (!response.ok && (response.status === 401 || response.status === 403)) {
        throw new Error('Unauthorized or Forbidden');
      }
      return response.json();
    })
    .then(data => setManufacturers(data))
    .catch(error => {
      console.error('Error fetching manufacturers:', error);
      history.push('/login');
    });
  }, [history]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData),
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
    .then(() => history.push('/products'))
    .catch(error => {
      console.error('Error creating product:', error);
      if (error.message === 'Unauthorized or Forbidden') {
        history.push('/login');
      }
    });
  };

  return (
    <div className="card">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="description" value={productData.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="category" value={productData.category} onChange={handleChange} placeholder="Category" required />
        <input type="number" name="alcoholPercentage" value={productData.alcoholPercentage} onChange={handleChange} placeholder="Alcohol Percentage" required />
        <input type="number" name="ibu" value={productData.ibu} onChange={handleChange} placeholder="IBU" required />
        <input type="number" name="srm" value={productData.srm} onChange={handleChange} placeholder="SRM" required />
        <input type="text" name="type" value={productData.type} onChange={handleChange} placeholder="Type" required />
        <select name="manufacturer" value={productData.manufacturer} onChange={handleChange}>
          <option value="">Select Manufacturer</option>
          {manufacturers.map(manufacturer => (
            <option key={manufacturer._id} value={manufacturer._id}>{manufacturer.name}</option>
          ))}
        </select>
        <button type="submit" className="button">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
