import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ProductFilter from './ProductFilter.js';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/products', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized or Forbidden');
      }
      return response.json();
    })
    .then(data => {
      setProducts(data);
      setFilteredProducts(data);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
  }, []);

  const deleteProduct = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:4000/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      if (response.ok) {
        const updatedProducts = products.filter(product => product._id !== id);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      } else {
        throw new Error('Error deleting the product');
      }
    })
    .catch(error => {
      console.error('Error:', error);
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
    <div className="card">
      <h2>Products</h2>
      {isAdmin() && <Link to="/create-product" className="button add-button">Add New Product</Link>}
      <ProductFilter products={products} onFilter={setFilteredProducts} />
      <ul className="list">
        {filteredProducts.map(product => (
          <li key={product._id} className="list-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Type: {product.category}</p>
            {isAdmin() && (
              <div className="actions">
                <Link to={`/product-details/${product._id}`} className="button detail-button">Details</Link> 
                <button onClick={() => deleteProduct(product._id)} className="button button-danger">Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
