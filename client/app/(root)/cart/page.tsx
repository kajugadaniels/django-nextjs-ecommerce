"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

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

    const { isSignedIn } = useUser();
    const router = useRouter();

    const handleCheckout = () => {
        if (isSignedIn) {
            router.push('/checkout');
        } else {
            router.push('/sign-in?redirect=/checkout');
        }
    };

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
                    className="w-16 h-16 border-t-4 border-emerald-900 border-solid rounded-full"
                />
            </div>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-16 md:py-32 mt-28 bg-gray-50"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-8 md:mb-20 ">Your Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-12 md:py-16 bg-white rounded-lg shadow-md"
                    >
                        <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">Your cart is empty</p>
                        <Link href="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2 md:px-6 md:py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300"
                            >
                                Continue Shopping
                            </motion.button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className='bg-white p-4 md:p-8 rounded-lg shadow-md'>
                        <div className="hidden md:grid grid-cols-6 gap-4 text-sm font-medium text-gray-700 border-b pb-4 mb-4">
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
                                    className="flex flex-col md:grid md:grid-cols-6 gap-4 items-center py-4 border-b"
                                >
                                    <div className="flex flex-col md:flex-row items-center md:col-span-3 w-full md:w-auto">
                                        <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover rounded-lg mb-2 md:mb-0" />
                                        <div className="md:ml-4 text-center md:text-left">
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
                                    <div className="text-center text-lg text-gray-700 w-full md:w-auto">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'RWF' }).format(Number(item.unit_price))}
                                    </div>
                                    <div className="flex justify-center items-center w-full md:w-auto">
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
                                    <div className="text-center md:text-right text-lg font-semibold text-gray-800 w-full md:w-auto">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'RWF' }).format(Number((parseFloat(item.unit_price) * item.quantity).toFixed(2)))}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full md:w-auto px-6 py-2 mb-4 md:mb-0 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </motion.button>
                            <div className="text-center md:text-right w-full md:w-auto">
                                <p className="text-xl font-medium text-gray-800">Subtotal: 
                                    <span className="font-bold">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'RWF' }).format(Number(calculateTotal()))}
                                    </span>
                                </p>
                                <Link href='/checkout'>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full md:w-auto mt-4 px-8 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                        onClick={handleCheckout}
                                    >
                                        Proceed to Checkout
                                    </motion.button>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 text-center md:text-left">
                            <Link href="/shop" className="text-green-600 hover:text-green-700 transition duration-300 flex items-center justify-center md:justify-start">
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