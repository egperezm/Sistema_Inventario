import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Obtener todos los productos al cargar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSave = async (product) => {
    if (editingProduct) {
      // Actualizar producto existente
      try {
        await axios.put(`/api/products/${editingProduct.id}`, product);
        fetchProducts(); // Recargar productos después de actualizar
        setEditingProduct(null); // Limpiar el estado de edición
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      // Crear nuevo producto
      try {
        await axios.post('/api/products', product);
        fetchProducts(); // Recargar productos después de crear uno nuevo
      } catch (error) {
        console.error('Error creating product:', error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts(); // Recargar productos después de eliminar uno
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="App">
      <h1>Inentario de poductos</h1>

      {/* Formulario para crear o editar productos */}
      <ProductForm onSave={handleSave} editingProduct={editingProduct} />

      {/* Lista de productos */}
      <ProductList 
        products={products} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;
