import React, { useState } from 'react';
import axios from 'axios';

function ProductForm({ product, onSave }) {
  const [name, setName] = useState(product ? product.name : '');
  const [description, setDescription] = useState(product ? product.description : '');
  const [price, setPrice] = useState(product ? product.price : '');
  const [available, setAvailable] = useState(product ? product.available : false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const productData = { name, description, price, available };

    if (product) {
      axios.put(`/api/products/${product.id}`, productData)
        .then(() => onSave())
        .catch(error => console.error('Error updating product:', error));
    } else {
      axios.post('/api/products', productData)
        .then(() => onSave())
        .catch(error => console.error('Error creating product:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      
      <label>Description: </label>
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} />

      <label>Price: </label>
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} />

      <label>Available: </label>
      <input type="checkbox" checked={available} onChange={e => setAvailable(e.target.checked)} />

      <button type="submit">{product ? 'Update Product' : 'Create Product'}</button>
    </form>
  );
}

export default ProductForm;

