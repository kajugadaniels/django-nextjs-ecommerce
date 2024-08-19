"use client";

import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from "@clerk/nextjs";

interface OrderItem {
    product_name: string;
    quantity: number;
    unit_price: string;
}

interface Order {
    id: string;
    total_amount: string;
    payment_status: string;
    created_at: string;
    items: OrderItem[];
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { user, isLoaded, isSignedIn } = useUser();
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (isSignedIn && user) {
                try {
                    const token = await getToken();
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setOrders(data);
                    } else {
                        console.error('Failed to fetch orders');
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            }
        };

        fetchOrders();
    }, [isSignedIn, user, getToken]);

    if (!isLoaded || !isSignedIn) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-gray-50 py-20'>
            <h2 className="text-3xl font-extrabold text-green-800 text-center pt-20 md:pt-44">Order Details</h2>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-12 mb-10">
                {orders.map((order) => (
                    <div key={order.id} className="mb-8 border-b pb-4">
                        <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
                        <p>Total Amount: ${order.total_amount}</p>
                        <p>Status: {order.payment_status}</p>
                        <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        <h4 className="font-semibold mt-4">Items:</h4>
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    {item.product_name} - Quantity: {item.quantity} - Price: ${item.unit_price}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;