"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from "@clerk/nextjs";
import Image from 'next/image';

interface CartItem {
    id: number;
    name: string;
    unit_price: string;
    image: string;
    quantity: number;
}

const CheckOut = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('userCart') || '[]');
        setCartItems(storedCart);
        setIsLoading(false);
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.unit_price) * item.quantity, 0).toFixed(2);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-t-4 border-emerald-900 border-solid rounded-full"
                />
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 py-32"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-emerald-900 mb-8 text-center">Checkout</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-semibold text-emerald-900 mb-6">Shipping Information</h2>
                            <form>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            defaultValue={user?.firstName || ''}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            defaultValue={user?.lastName || ''}
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="city">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="zipCode">
                                            ZIP Code
                                        </label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
                            <h2 className="text-2xl font-semibold text-emerald-900 mb-6">Order Summary</h2>
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-center">
                                        <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-md mr-4" />
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-emerald-900">${(parseFloat(item.unit_price) * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex justify-between mb-2">
                                    <p className="text-gray-600">Subtotal</p>
                                    <p className="font-semibold text-gray-800">${calculateTotal()}</p>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <p className="text-gray-600">Shipping</p>
                                    <p className="font-semibold text-gray-800">$0.00</p>
                                </div>
                                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-lg font-semibold text-gray-800">Total</p>
                                    <p className="text-lg font-semibold text-emerald-900">${calculateTotal()}</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full mt-8 bg-emerald-900 text-white py-3 px-4 rounded-md hover:bg-emerald-800 transition duration-300 font-semibold text-lg"
                            >
                                Place Order
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CheckOut;