import React, { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/products', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
      const groupedProducts = data.reduce((acc, product) => {
        acc[product.manufacturer.name] = [...(acc[product.manufacturer.name] || []), product];
        return acc;
      }, {});
      setProducts(groupedProducts);
    })
    .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="card">
      <h1>Welcome to the BeerCraft</h1>
      {Object.keys(products).map(manufacturerName => (
        <div key={manufacturerName}>
          <h2>{manufacturerName}</h2>
          <ul>
            {products[manufacturerName].map(product => (
              <li key={product._id}>{product.name} - {product.category}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
