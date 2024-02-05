"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const ShoppingCard = () => {

    const [cartItems, setCartItems] = useState([]);
    const cartId = '65b79fa217b8026fcbf3b88b';

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:2020/cart-items/${cartId}`);
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleDelete = async (cartId, productId) => {
        try {
            const response = await axios.delete(`http://localhost:2020/cart-items/${cartId}/${productId}`);
            console.log(response.data);
            fetchCartItems()
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    
    const updateQuantity = (index, value) => {
        const updatedItems = [...cartItems];
        console.log(updatedItems)
        updatedItems[index].quantity = value;
        setCartItems(updatedItems);
      };

    const handleUpdate = async (cartId, productId, updatedQuantity) => {
        try {
            const response = await axios.patch('http://localhost:2020/cart-items', {
                cartId,
                productId,
                quantity: updatedQuantity,
            });
            console.log("cartid", cartId, "productid", productId, "quantity:", updatedQuantity)
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    };


    return (
        <div>
            <div className="h-screen bg-gray-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {cartItems.map((cartItem, index) => (
                            <div key={cartItem._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                <img src={cartItem.productId.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">{cartItem.productId.name}</h2>
                                            <p className="text-xs font-bold text-gray-900">You have {cartItem.quantity} items</p>
                                        </div>
                                        <div className="mt-3 flex items-center space-x-3">
                                            <FontAwesomeIcon icon={faTrash} className='text-red-500 text-xl text-red-500 cursor-pointer' 
                                                onClick={() => handleDelete(cartItem.cartId, cartItem.productId._id)}
                                            />
                                            <FontAwesomeIcon icon={faPenToSquare} className='text-blue-500 text-xl text-blue-500 cursor-pointer' 
                                                onClick={() => handleUpdate(cartItem.cartId, cartItem.productId._id, cartItem.quantity)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:space-y-6">
                                        <div className="flex items-center border-gray-100">
                                            <span 
                                                className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                                onClick={() => updateQuantity(index, cartItem.quantity - 1)}
                                            > 
                                                - 
                                            </span>
                                            <input
                                                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                                                type="number"
                                                value={cartItem.quantity}
                                                min="1"
                                                onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
                                            />
                                            <span 
                                                className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                                onClick={() => updateQuantity(index, cartItem.quantity + 1)}
                                            > 
                                                + 
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm font-bold"> Price total   {cartItem.productId.price * cartItem.quantity}$</p>
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