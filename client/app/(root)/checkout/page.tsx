"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { getApiUrl, getMediaUrl } from '@/lib/apiConfig';
import { parsePhoneNumber, isValidPhoneNumber, AsYouType } from 'libphonenumber-js';

interface CartItem {
    id: number;
    name: string;
    slug: string;
    image: string;
    unit_price: number;
    quantity: number;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    image: string;
    unit_price: number;
}

interface UserData {
    id: number;
    clerk_id: string;
    email: string;
    first_name: string;
    last_name: string;
    slug: string;
}

const CheckOut = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const { user, isLoaded, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const router = useRouter();

    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        zipCode: '',
        phone: '',
    });

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const storedCart = JSON.parse(localStorage.getItem('userCart') || '[]');
                setCartItems(storedCart);

                const productIds = storedCart.map((item: CartItem) => item.id);
                const response = await fetch(`${getApiUrl()}/products/?ids=${productIds.join(',')}`);
                const fetchedProducts = await response.json();
                setProducts(fetchedProducts);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (isSignedIn && user?.id) {
                try {
                    const token = await getToken();
                    const response = await fetch(`${getApiUrl()}/auth/users/${user.id}/`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);
                    } else {
                        console.error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [isSignedIn, user, getToken]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.unit_price * item.quantity, 0).toFixed(2);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({ ...prev, [name]: value }));
    };

    const showNotification = (message: string, icon: 'success' | 'error' | 'warning') => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: icon,
            title: message,
        });
    };

    const handlePlaceOrder = () => {
        if (!isSignedIn || !user) {
            showNotification('Please sign in to place an order.', 'error');
            router.push('/sign-in');
            return;
        }

        setShowModal(true);
    };

    const confirmOrder = async () => {
        setIsProcessing(true);
        try {
            const token = await getToken();

            // Format phone number to E.164
            let formattedPhone;
            try {
                const phoneNumber = parsePhoneNumber(shippingInfo.phone, 'RW');
                if (isValidPhoneNumber(shippingInfo.phone, 'RW')) {
                    formattedPhone = phoneNumber.format('E.164');
                } else {
                    throw new Error('Invalid phone number');
                }
            } catch (error) {
                showNotification('Invalid phone number. Please check and try again.', 'error');
                setIsProcessing(false);
                return;
            }

            const orderData = {
                user_id: userData?.clerk_id,
                user_email: userData?.email,
                total_amount: calculateTotal(),
                items: cartItems.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    quantity: item.quantity,
                    unit_price: item.unit_price
                })),
                shipping_address: shippingInfo.address,
                shipping_city: shippingInfo.city,
                shipping_zip_code: shippingInfo.zipCode,
                shipping_phone: formattedPhone
            };

            // Send payment request along with order data
            const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    phone: formattedPhone,
                    amount: calculateTotal(),
                    order_data: orderData
                }),
            });

            const paymentResult = await paymentResponse.json();
            console.log('Payment response:', paymentResult);

            if (paymentResult.status === "SUCCESS" || paymentResult.status === "Pending") {
                const message = paymentResult.status === "SUCCESS"
                    ? `Payment successful. Order ID: ${paymentResult.order_id}`
                    : `Payment is pending. Order ID: ${paymentResult.order_id}`;
                
                showNotification(message, 'success');
                localStorage.removeItem('userCart');
                router.push('/orders');
            } else {
                showNotification(`Payment failed: ${paymentResult.message}`, 'error');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            showNotification(`Failed to process payment: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
        } finally {
            setIsProcessing(false);
            setShowModal(false);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const asYouType = new AsYouType('RW'); // Assuming 'RW' for Rwanda
        const formattedInput = asYouType.input(inputValue);

        setShippingInfo(prev => ({
            ...prev,
            phone: formattedInput
        }));
    };

    const isPhoneValid = () => {
        try {
            return isValidPhoneNumber(shippingInfo.phone, 'RW');
        } catch {
            return false;
        }
    };

    const getProductImageUrl = (productId: number) => {
        const product = products.find((p) => p.id === productId);
        if (product && product.image) {
            return `${getMediaUrl()}${product.image}`;
        }
        return '/placeholder.png'; // Placeholder image URL
    };

    if (!isLoaded || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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
                                            value={userData?.first_name || ''}
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
                                            value={userData?.last_name || ''}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        value={userData?.email || ''}
                                        readOnly
                                    />
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
                                        required
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
                                            required
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
                                            required
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
                                        onChange={handlePhoneChange}
                                        className={`w-full px-4 py-2 border ${
                                            isPhoneValid() ? 'border-gray-300' : 'border-red-500'
                                        } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                                        placeholder="+250 7x xxx xxxx"
                                        required
                                    />
                                    {!isPhoneValid() && shippingInfo.phone && (
                                        <p className="mt-1 text-sm text-red-600">Please enter a valid phone number.</p>
                                    )}
                                    {isPhoneValid() && (
                                        <p className="mt-1 text-sm text-green-600">
                                            E.164 format: {parsePhoneNumber(shippingInfo.phone, 'RW').format('E.164')}
                                        </p>
                                    )}
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
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={60}
                                            height={60}
                                            className="rounded-md mr-4"
                                        />
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="text-lg font-medium text-gray-900">${item.unit_price * item.quantity}</div>
                                </div>
                            ))}
                            <div className="text-xl font-bold text-emerald-900 mt-6">Total: ${calculateTotal()}</div>
                            <button
                                onClick={handlePlaceOrder}
                                className="mt-6 w-full px-4 py-2 bg-emerald-900 text-white text-lg font-semibold rounded-md hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md mx-auto">
                        <h2 className="text-2xl font-semibold text-emerald-900 mb-6">Order Confirmation</h2>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Products:</h3>
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between mb-2">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                        className="rounded-md mr-4"
                                    />
                                    <span>
                                        {item.name} (x{item.quantity})
                                    </span>
                                    <span>${item.unit_price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-lg font-bold text-emerald-900 mt-4">Total: ${calculateTotal()}</div>
                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">User Information:</h3>
                            <p>
                                <strong>Names:</strong> {userData?.first_name ?? 'N/A'} {userData?.last_name ?? 'N/A'}
                            </p>
                            <p>
                                <strong>Email:</strong> {userData?.email ?? 'N/A'}
                            </p>
                            <p>
                                <strong>Phone Number:</strong> {shippingInfo.phone}
                            </p>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={confirmOrder}
                                className="px-4 py-2 bg-emerald-900 text-white text-lg font-semibold rounded-md hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : "Confirm Order and Pay"}
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                                aria-label="Close"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default CheckOut;