import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const EditProduct = () => {
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
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/products/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 401 || response.status === 403) {
          throw new Error('Unauthorized or Forbidden');
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        if (error.message === 'Unauthorized or Forbidden') {
          history.push('/login');
        }
      }
    };

    const fetchManufacturers = async () => {
      try {
        const response = await fetch('http://localhost:4000/manufacturers', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setManufacturers(data);
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
      }
    };

    fetchProduct();
    fetchManufacturers();
  }, [id, history]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(productData),
      });
      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or Forbidden');
      }
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      history.push('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.message === 'Unauthorized or Forbidden') {
        history.push('/login');
      }
    }
  };

  return (
    <div className="card">
      <h2>Edit Product</h2>
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
        <button type="submit" className="button">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
