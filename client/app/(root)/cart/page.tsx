"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

interface CartItem {
    id: number;
    name: string;
    slug: string;
    unit_price: string;
    image: string;
    quantity: number;
    timestamp: number;
}

const CART_STORAGE_KEY = 'userCart';
const CART_EXPIRY_TIME = 60 * 60 * 1000; 

function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCart = () => {
            setIsLoading(true);
            const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
            const currentTime = Date.now();
            const validItems = storedCart.filter((item: CartItem) => currentTime - item.timestamp < CART_EXPIRY_TIME);
            setCartItems(validItems);
            setIsLoading(false);
        };

        loadCart();
        const intervalId = setInterval(loadCart, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const showNotification = (message: string, icon: 'success' | 'error') => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon: icon,
            title: message
        });
    };

    const updateCart = (newCart: CartItem[]) => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
            setCartItems(newCart);
            showNotification('Cart updated successfully', 'success');
        } catch (error) {
            console.error('Error updating cart:', error);
            showNotification('Failed to update cart. Please try again.', 'error');
        }
    };

    const removeItem = (id: number) => {
        const newCart = cartItems.filter(item => item.id !== id);
        updateCart(newCart);
    };

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        const newCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity, timestamp: Date.now() } : item
        );
        updateCart(newCart);
    };

    const clearCart = () => {
        try {
            localStorage.removeItem(CART_STORAGE_KEY);
            setCartItems([]);
            showNotification('Cart cleared successfully', 'success');
        } catch (error) {
            console.error('Error clearing cart:', error);
            showNotification('Failed to clear cart. Please try again.', 'error');
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.unit_price) * item.quantity, 0).toFixed(2);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
                />
            </div>
        );
    }

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-12 mt-20 bg-gray-50"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Your Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-16 bg-white rounded-lg shadow-md"
                    >
                        <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
                        <Link href="/shop">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300"
                            >
                                Continue Shopping
                            </motion.button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className='bg-white p-8 rounded-lg shadow-md'>
                        <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700 border-b pb-4 mb-4">
                            <div className="col-span-3 font-bold">PRODUCT</div>
                            <div className="text-center font-bold">PRICE</div>
                            <div className="text-center font-bold">QUANTITY</div>
                            <div className="text-right font-bold">TOTAL</div>
                        </div>

                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div 
                                    key={item.id} 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-6 gap-4 items-center py-4 border-b"
                                >
                                    <div className="flex col-span-3 items-center">
                                        <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover rounded-lg" />
                                        <div className="ml-4">
                                            <h5 className="font-semibold text-gray-800">{item.name}</h5>
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="text-red-500 mt-2 text-sm"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                Remove
                                            </motion.button>
                                        </div>
                                    </div>
                                    <div className="text-center text-lg text-gray-700">${item.unit_price}</div>
                                    <div className="flex justify-center items-center">
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="px-3 py-1 border rounded-l bg-gray-100 hover:bg-gray-200 transition duration-300"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </motion.button>
                                        <input
                                            type="text"
                                            className="w-12 text-center border-y bg-gray-50"
                                            value={item.quantity}
                                            readOnly
                                        />
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="px-3 py-1 border rounded-r bg-gray-100 hover:bg-gray-200 transition duration-300"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </motion.button>
                                    </div>
                                    <div className="text-right text-lg font-semibold text-gray-800">
                                        ${(parseFloat(item.unit_price) * item.quantity).toFixed(2)}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="flex justify-between items-center mt-8">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </motion.button>
                            <div className="text-right">
                                <p className="text-xl font-medium text-gray-800">Subtotal: <span className="font-bold">${calculateTotal()}</span></p>
                                <Link href='/checkout'>
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-4 px-8 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                    >
                                        Proceed to Checkout
                                    </motion.button>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link href="/shop" className="text-green-600 hover:text-green-700 transition duration-300 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </motion.section>
    );
}

export default Cart;