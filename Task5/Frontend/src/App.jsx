import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '' });

  useEffect(() => {
    fetchProducts();
  }, [page, sortBy, order, minPrice, maxPrice]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: { page, sortBy, order, minPrice, maxPrice },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:5000/api/products', {
        ...newProduct,
        price: parseFloat(newProduct.price),
        views: 0,
        reviews: 0,
        popularity: 0,
      });
      setNewProduct({ name: '', category: '', price: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <div>
        <label>Min Price: </label>
        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <label>Max Price: </label>
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        <label>Sort By: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Date</option>
          <option value="price">Price</option>
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <h2>Add New Product</h2>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
