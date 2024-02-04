"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShoppingCard = () => {

    const [cartItems, setCartItems] = useState([]);
    const cartId = '65b79fa217b8026fcbf3b88b';

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:2020/cart-items/${cartId}`);
                console.log("response:", response);
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const handleDelete = async (cartId, productId) => {
        try {
          const response = await axios.delete(`http://localhost:2020/cart-items/${cartId}/${productId}`);
          console.log(response.data); // Assuming the backend sends a response message
          // Optionally, you can update the state or perform other actions after a successful deletion
        } catch (error) {
          console.error('Error deleting product:', error);
          // Optionally, handle errors or show a notification to the user
        }
      };

    return (
        <div>
            <div className="h-screen bg-gray-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {cartItems.map((cartItem) => (
                            <div key={cartItem._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                <img src={cartItem.productId.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">{cartItem.productId.name}</h2>
                                        </div>
                                        <div className="mt-3 flex items-center space-x-4">
                                            <button
                                                onClick={() => handleDelete(cartItem.cartId, cartItem.productId._id)}
                                                className="text-red-500 cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handleUpdate(cartItem._id)}
                                                className="text-blue-500 cursor-pointer"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100">
                                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                            <input
                                                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                                                type="number"
                                                value={cartItem.quantity}
                                                min="1"
                                            />
                                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm">{cartItem.productId.price}$</p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                                            >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">$129.99</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">$4.99</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCard;