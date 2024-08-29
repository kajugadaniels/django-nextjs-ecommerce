"use client"

import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from "@clerk/nextjs";
import Image from 'next/image';
import { getApiUrl, getMediaUrl } from '@/lib/apiConfig';

interface OrderItem {
    id: number;
    product: {
        id: number;
        name: string;
        image: string;
        unit_price: number;
    };
    quantity: number;
}

interface Order {
    id: number;
    user: number;
    total_amount: string;
    payment_status: string;
    created_at: string;
    items: OrderItem[];
    shipping_address: string;
    shipping_city: string;
    shipping_zip_code: string;
    shipping_phone: string;
    transaction_id: string;
}

interface UserData {
    id: number;
    clerk_id: string;
    email: string;
}

const Orders = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserDataAndOrders = async () => {
            if (isSignedIn && user) {
                try {
                    const token = await getToken();

                    // Fetch user data
                    const userResponse = await fetch(`${getApiUrl()}/auth/users/${user.id}/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!userResponse.ok) {
                        throw new Error('Failed to fetch user data');
                    }

                    const userData = await userResponse.json();
                    setUserData(userData);

                    // Fetch all orders
                    const ordersResponse = await fetch(`${getApiUrl()}/orders/list/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!ordersResponse.ok) {
                        throw new Error('Failed to fetch orders');
                    }

                    const allOrders = await ordersResponse.json();

                    // Filter orders for the current user
                    const userOrders = allOrders.filter((order: Order) => order.user === userData.id);
                    setOrders(userOrders);
                    setFilteredOrders(userOrders);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        if (isLoaded) {
            fetchUserDataAndOrders();
        }
    }, [isLoaded, isSignedIn, user, getToken]);

    useEffect(() => {
        const filterOrders = () => {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = orders.filter(order =>
                order.id.toString().includes(lowercasedQuery) ||
                order.items.some(item => item.product.name.toLowerCase().includes(lowercasedQuery))
            );
            setFilteredOrders(filtered);
        };

        filterOrders();
    }, [searchQuery, orders]);

    if (!isLoaded || isLoading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!isSignedIn) {
        return <div className="text-center py-20">Please sign in to view your orders.</div>;
    }

    const getProductImageUrl = (imagePath: string) => {
        if (imagePath) {
            return `${getMediaUrl()}${imagePath}`;
        }
        return '/placeholder.png'; // Placeholder image URL
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Failed':
                return 'bg-red-100 text-red-800';
            case 'Success':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
    };

    if (!isLoaded || isLoading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!isSignedIn) {
        return <div className="text-center py-20">Please sign in to view your orders.</div>;
    }

    return (
        <div className='bg-gray-100 py-20 px-4 sm:px-6 lg:px-8'>
            <h2 className="text-3xl font-extrabold text-gray-900 text-center pt-20 md:pt-44 mb-10">Order History</h2>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className='flex'>
                                        <div className="w-12 h-12 relative">
                                            <Image
                                                src={order.items[0].product.image}
                                                alt={order.items[0].product.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className='mx-4'>
                                            <h3 className="text-lg font-semibold text-gray-900">{order.items[0].product.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'RWF' }).format(Number(parseFloat(order.total_amount).toFixed(2)))}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Order Id:</p>
                                        <p className="text-sm font-semibold text-gray-900">#{order.id}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500">Delivery Address</p>
                                    <p className="text-sm text-gray-700">{order.shipping_address}</p>
                                    <p className="text-sm text-gray-700">{order.shipping_city}, {order.shipping_zip_code}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(order.payment_status)}`}>
                                            {order.payment_status}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {formatDate(order.created_at)}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4">
                                <div className="flex justify-between items-center">
                                    <button className="text-sm text-emerald-950 hover:text-emerald-800">Rate Product</button>
                                    {order.payment_status.toLowerCase() !== 'delivered' && order.payment_status.toLowerCase() !== 'cancelled' && (
                                        <button className="text-sm text-red-600 hover:text-red-900">Cancel Order</button>
                                    )}
                                    {order.payment_status.toLowerCase() === 'delivered' && (
                                        <span className="text-sm text-green-600">Delivered on: {new Date(order.created_at).toLocaleDateString()}</span>
                                    )}
                                    {order.payment_status.toLowerCase() === 'cancelled' && (
                                        <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Buy Now</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
