import React, { useState, useEffect } from 'react';

const ProductFilter = ({ products, onFilter }) => {
  const [category, setCategory] = useState('');
  const [alcoholPercentage, setAlcoholPercentage] = useState('');

  const categories = [...new Set(products.map(product => product.category))];
  const alcoholPercentages = [...new Set(products.map(product => product.alcoholPercentage))];

  useEffect(() => {
    const filteredProducts = products.filter(product => 
      (category === '' || product.category === category) &&
      (alcoholPercentage === '' || product.alcoholPercentage === Number(alcoholPercentage))
    );
    onFilter(filteredProducts);
  }, [category, alcoholPercentage, products, onFilter]);

  return (
    <div>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Odaberite kategoriju</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select value={alcoholPercentage} onChange={e => setAlcoholPercentage(e.target.value)}>
        <option value="">Odaberite postotak alkohola</option>
        {alcoholPercentages.map(ap => (
          <option key={ap} value={ap}>{ap}%</option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;
