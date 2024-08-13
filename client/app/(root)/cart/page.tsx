"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

    useEffect(() => {
        const loadCart = () => {
            const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
            const currentTime = Date.now();
            const validItems = storedCart.filter((item: CartItem) => currentTime - item.timestamp < CART_EXPIRY_TIME);
            setCartItems(validItems);
        };

        loadCart();
        const intervalId = setInterval(loadCart, 60000); 

        return () => clearInterval(intervalId);
    }, []);

    const updateCart = (newCart: CartItem[]) => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
        setCartItems(newCart);
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
        localStorage.removeItem(CART_STORAGE_KEY);
        setCartItems([]);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.unit_price) * item.quantity, 0).toFixed(2);
    };

    return (
        <section className="py-12 mt-40">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-center mb-8">Shopping Cart</h2>
                <div className='bg-gray-100 p-10 rounded-lg'>
                    <div className="grid grid-cols-5 text-sm font-medium text-gray-700 border-b py-2">
                        <div className="col-span-2 font-bold">PRODUCT</div>
                        <div className="text-center font-bold">PRICE</div>
                        <div className="text-center font-bold">QUANTITY</div>
                        <div className="text-right font-bold">TOTAL</div>
                    </div>

                    {cartItems.map((item) => (
                        <div key={item.id} className="grid grid-cols-5 gap-4 items-center py-4 border-b">
                            <div className="flex col-span-2 items-center">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div className="ml-4">
                                    <h5 className="font-semibold">{item.name}</h5>
                                    <button className="text-green-900 mt-2" onClick={() => removeItem(item.id)}>Remove</button>
                                </div>
                            </div>
                            <div className="text-center text-lg">${item.unit_price}</div>
                            <div className="flex justify-center items-center">
                                <button className="px-3 py-1 border rounded-l bg-gray-200" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <input
                                    type="text"
                                    className="w-12 text-center border-y"
                                    value={item.quantity}
                                    readOnly
                                />
                                <button className="px-3 py-1 border rounded-r bg-gray-200" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <div className="text-right text-lg font-semibold">
                                ${(parseFloat(item.unit_price) * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center mt-8">
                        <button className="px-6 py-2 bg-gray-200 text-gray-600 rounded" onClick={clearCart}>Clear Cart</button>
                        <div className="text-right">
                            <p className="text-lg font-medium">Subtotal: ${calculateTotal()}</p>
                            <button className="mt-4 px-6 py-3 bg-green-900 text-white rounded">Check out</button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Link href="/" className="text-green-900 flex items-center">
                            <span>&larr;</span> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cart;