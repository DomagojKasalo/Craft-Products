import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    fetch(`http://localhost:4000/products/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or Forbidden');
      }
      return response.json();
    })
    .then(data => setProduct(data))
    .catch(error => {
      console.error('Error fetching product details:', error);
      if (error.message === 'Unauthorized or Forbidden') {
        history.push('/login');
      }
    });
  }, [id, history]);

  const handleEditClick = () => {
    history.push(`/edit-product/${id}`);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="card">
      <h2>{product?.name}</h2>
      <p>{product?.description}</p>
      <p>Price: {product?.price}</p>
      <p>Category: {product?.category}</p>
      <p>Alcohol Percentage: {product?.alcoholPercentage}%</p>
      <p>IBU: {product?.ibu}</p>
      <p>SRM: {product?.srm}</p>
      <p>Manufacturer: {product.manufacturer?.name}</p>
      <div className="actions">
        <button onClick={handleEditClick} className="button">Edit</button>
        <button onClick={() => history.goBack()} className="button">Go Back</button>
      </div>
    </div>
  );
};

export default ProductDetails;
