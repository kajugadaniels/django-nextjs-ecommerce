"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CartItem {
    id: number;
    name: string;
    unit_price: number | string;
    image: string;
    quantity: number;
}

interface CartModelProps {
    onClose: () => void;
}

const CART_STORAGE_KEY = 'userCart';

export const useCartItems = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const loadCart = () => {
            const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
            setCartItems(storedCart);
        };

        loadCart();
        const intervalId = setInterval(loadCart, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return cartItems;
};

const CartModel: React.FC<CartModelProps> = ({ onClose }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const loadCart = () => {
            const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
            setCartItems(storedCart);
        };

        loadCart();
        const intervalId = setInterval(loadCart, 1000); // Refresh cart every second

        return () => clearInterval(intervalId);
    }, []);

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        const updatedCart = cartItems.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    };

    const removeItem = (id: number) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    };

    const formatPrice = (price: number | string | undefined): string => {
        if (typeof price === 'number') {
            return price.toFixed(2);
        }
        if (typeof price === 'string') {
            const numPrice = parseFloat(price);
            return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
        }
        return '0.00';
    };

    const calculateItemTotal = (item: CartItem): number => {
        const itemPrice = typeof item.unit_price === 'number' ? item.unit_price : parseFloat(item.unit_price) || 0;
        return itemPrice * item.quantity;
    };

    const totalPrice = cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);

    return (
        <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 overflow-y-auto"
        >
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                                    <Image 
                                        src={item.image} 
                                        alt={item.name} 
                                        width={60} 
                                        height={60} 
                                        className="rounded-md object-cover"
                                        unoptimized
                                    />
                                    <div className="flex-grow">
                                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">${formatPrice(item.unit_price)}</p>
                                        <p className="text-sm font-bold text-gray-700">Total: ${formatPrice(calculateItemTotal(item))}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            className="text-gray-500 hover:text-gray-700"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="text-gray-700">{item.quantity}</span>
                                        <button 
                                            className="text-gray-500 hover:text-gray-700"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button 
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-medium text-gray-900">Total</span>
                                <span className="text-lg font-bold text-gray-900">${formatPrice(totalPrice)}</span>
                            </div>
                            <Link href="/cart">
                                <button 
                                    onClick={onClose} 
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300"
                                >
                                    View Cart
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default CartModel;