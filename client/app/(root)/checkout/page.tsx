"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useUser } from "@clerk/nextjs";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface CartItem {
    id: number;
    name: string;
    unit_price: string;
    image: string;
    quantity: number;
}

const CheckOut = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { user, isLoaded, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        zipCode: '',
        phone: '',
    });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('userCart') || '[]');
        setCartItems(storedCart);
        setIsLoading(false);
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.unit_price) * item.quantity, 0).toFixed(2);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const showNotification = (message: string, icon: 'success' | 'error') => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: icon,
            title: message
        });
    };

    const handlePlaceOrder = () => {
        if (!isSignedIn || !user) {
            showNotification('Please sign in to place an order.', 'error');
            router.push('/sign-in');
            return;
        }

        setShowModal(true); // Show the modal with the order details before placing the order
    };

    const confirmOrder = async () => {
        setIsProcessing(true);
        try {
            const token = await getToken();
            const orderData = {
                user_email: user?.primaryEmailAddress?.emailAddress ?? '',
                total_amount: calculateTotal(),
                payment_status: 'Not Paid',
                items: cartItems.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    quantity: item.quantity,
                    unit_price: item.unit_price
                })),
                shipping_info: shippingInfo,
                user_first_name: user?.firstName ?? '',
                user_last_name: user?.lastName ?? '',
                user_pk: user?.id ?? ''  // Ensure you handle user.pk according to your actual user structure
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                showNotification('Order placed successfully!', 'success');
                localStorage.removeItem('userCart');
                router.push('/orders');
            } else {
                const responseText = await response.text();
                if (response.headers.get('Content-Type')?.includes('application/json')) {
                    const errorData = JSON.parse(responseText);
                    console.error('Error response:', errorData);
                    showNotification(`Failed to place order: ${errorData.message}`, 'error');
                } else {
                    console.error('Unexpected response:', responseText);
                    showNotification('Failed to place order. Please try again.', 'error');
                }
            }
        } catch (error) {
            console.error('Error placing order:', error);
            showNotification('Failed to place order. Please try again.', 'error');
        } finally {
            setIsProcessing(false);
            setShowModal(false);
        }
    };

    if (!isLoaded || isLoading) {
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
            className="min-h-screen bg-gray-50 py-40"
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
                                            readOnly
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
                                            readOnly
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
                                        value={shippingInfo.address}
                                        onChange={handleInputChange}
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
                                            value={shippingInfo.city}
                                            onChange={handleInputChange}
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
                                            value={shippingInfo.zipCode}
                                            onChange={handleInputChange}
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
                                        value={shippingInfo.phone}
                                        onChange={handleInputChange}
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
                                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="text-lg font-medium text-gray-900">
                                        ${parseFloat(item.unit_price) * item.quantity}
                                    </div>
                                </div>
                            ))}
                            <div className="text-xl font-bold text-emerald-900 mt-6">
                                Total: ${calculateTotal()}
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                className="mt-6 w-full px-4 py-2 bg-emerald-900 text-white text-lg font-semibold rounded-md hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : "Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md mx-auto">
                        <h2 className="text-2xl font-semibold text-emerald-900 mb-6">Order Confirmation</h2>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Products:</h3>
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between mb-2">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>${parseFloat(item.unit_price) * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-lg font-bold text-emerald-900 mt-4">
                            Total: ${calculateTotal()}
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">User Information:</h3>
                            <p><strong>First Name:</strong> {user?.firstName ?? 'N/A'}</p>
                            <p><strong>Last Name:</strong> {user?.lastName ?? 'N/A'}</p>
                            <p><strong>Primary Key:</strong> {user?.id ?? 'N/A'}</p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={confirmOrder}
                                className="px-4 py-2 bg-emerald-900 text-white text-lg font-semibold rounded-md hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : "Confirm Order"}
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="ml-4 px-4 py-2 bg-gray-300 text-lg font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default CheckOut;
