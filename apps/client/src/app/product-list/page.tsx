"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:2020/api/product');
        setProducts(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addProductToCart = async (productId: any) => {
    try {
      const cartId = '65b79fa217b8026fcbf3b88b';

      const response = await axios.post('http://localhost:2020/cart-items', {
        cartId,
        productId,
        quantity,
      });

      const addedProduct = response.data;
      setSuccessMessage(addedProduct.message);
      console.log('Product added to cart:', addedProduct);

      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);

      setQuantity(1)
    } catch (error) {
      console.error('Failed to add product to cart:', error.message);
    }
  };

  return (
    <div>
      {successMessage && (
        <div>
          <div id="successModal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto m-auto">
              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                  <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </div>
                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{successMessage}.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-around">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-6 m-4 rounded-lg shadow-md max-w-xs">
            <img
              src={product.image}
              alt="Product Image"
              className="object-cover w-full h-48 mb-4 rounded-md"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
            <p className="text-gray-700">Quantity: {product.quantity}</p>
            <button
              onClick={() => addProductToCart(product._id)}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Add to Cart
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="w-16 px-2 py-1 mt-2 border rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;