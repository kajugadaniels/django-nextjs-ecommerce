"use client";

import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from "@clerk/nextjs";
import Image from 'next/image';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    unit_price: string;
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
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserDataAndOrders = async () => {
            if (isSignedIn && user) {
                try {
                    const token = await getToken();
                    
                    // Fetch user data
                    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/${user.id}/`, {
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
                    const ordersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/list/`, {
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

    if (!isLoaded || isLoading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!isSignedIn) {
        return <div className="text-center py-20">Please sign in to view your orders.</div>;
    }

    return (
        <div className='bg-gray-50 py-20'>
            <h2 className="text-3xl font-extrabold text-green-800 text-center pt-20 md:pt-44">Order History</h2>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-12 mb-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 w-full">
                        <input
                            type="text"
                            placeholder="Search by Order ID"
                            className="bg-white text-gray-600 px-4 md:px-12 py-3 border rounded-l focus:outline-none w-full md:w-auto"
                        />
                        <button className="bg-green-800 text-white px-4 py-2 rounded-r w-full md:w-auto">
                            Search
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                        <select className="bg-white text-gray-500 px-4 py-2 border rounded w-full md:w-auto">
                            <option>Filter by: All</option>
                            <option>Completed</option>
                            <option>Not Paid</option>
                        </select>
                        <select className="bg-white text-gray-500 px-4 py-2 border rounded w-full md:w-auto">
                            <option>Last 7 days</option>
                            <option>Last 14 days</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>
                </div>
                
                {orders.length === 0 ? (
                    <p className="text-center py-10">No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-white p-4 rounded-lg mb-6 border border-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
                                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                                    <div className="flex space-x-2">
                                        <span className="text-gray-400">Order ID:</span>
                                        <span className="text-black font-semibold">#{order.id}</span>
                                    </div>
                                    <span className={`text-sm px-3 py-1 rounded ${
                                        order.payment_status === 'Not Paid' 
                                            ? 'bg-red-100 text-red-800' 
                                            : 'bg-green-100 text-green-800'
                                    }`}>
                                        {order.payment_status}
                                    </span>
                                </div>
                                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
                                    <button className="bg-gray-400 text-white px-4 py-2 rounded w-full md:w-auto">Order details</button>
                                </div>
                            </div>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-4 border-t border-gray-200">
                                    <div className="w-28 h-28 bg-gray-200 rounded-md"></div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-center md:text-left">{item.product_name}</h3>
                                        <p className="text-sm text-gray-600 text-center md:text-left">Qty: {item.quantity}</p>
                                        <p className="font-semibold text-emerald-900 text-center md:text-left">Price: ${parseFloat(item.unit_price).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <span className="text-gray-400">Order date:</span>
                                    <span className="text-gray-600 ml-2">{new Date(order.created_at).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Total:</span>
                                    <span className="text-gray-600 ml-2 font-semibold">${parseFloat(order.total_amount).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;