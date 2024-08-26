"use client"

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    HomeIcon,
    UserCircleIcon,
    ShoppingBagIcon,
    ChartBarIcon,
    CreditCardIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import OrdersChart from '@/components/shared/OrdersChart';
import UserProfileCard from '@/components/shared/UserProfileCard';
import RecentOrders from '@/components/shared/RecentOrders';

const Dashboard: React.FC = () => {
    const { user } = useUser();
    const pathname = usePathname();
    const [activeLink, setActiveLink] = useState('dashboard');

    useEffect(() => {
        const path = pathname?.split('/')[2] || 'dashboard';
        setActiveLink(path);
    }, [pathname]);

    const sidebarLinks = [
        { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
        { name: 'Profile', icon: UserCircleIcon, href: '/dashboard/profile' },
        { name: 'Orders', icon: ShoppingBagIcon, href: '/dashboard/orders' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 py-44">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <nav className="mt-5">
                    {sidebarLinks.map((link) => (
                        <Link key={link.name} href={link.href} 
                            className={`flex items-center mt-4 py-2 px-6 ${
                                activeLink === link.name.toLowerCase()
                                    ? 'bg-green-800 text-white'
                                    : 'text-gray-500 hover:bg-green-100 hover:text-green-800'
                            } transition-colors duration-200`}
                        >
                            <link.icon className="h-5 w-5 mr-3" />
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-x-hidden overflow-y-auto">
                <div className="container mx-auto px-6 py-8">
                    <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>
                    <div className="mt-8">
                        {/* Quick Stats */}
                        <div className="flex flex-wrap -mx-6">
                            <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                    <div className="p-3 rounded-full bg-green-800 bg-opacity-75">
                                        <CreditCardIcon className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="mx-5">
                                        <h4 className="text-2xl font-semibold text-gray-700">$30,000</h4>
                                        <div className="text-gray-500">Total Revenue</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                    <div className="p-3 rounded-full bg-green-800 bg-opacity-75">
                                        <ShoppingBagIcon className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="mx-5">
                                        <h4 className="text-2xl font-semibold text-gray-700">150</h4>
                                        <div className="text-gray-500">Total Orders</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                    <div className="p-3 rounded-full bg-green-800 bg-opacity-75">
                                        <UserGroupIcon className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="mx-5">
                                        <h4 className="text-2xl font-semibold text-gray-700">50</h4>
                                        <div className="text-gray-500">New Customers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col lg:flex-row">
                        {/* Orders Chart */}
                        <div className="w-full lg:w-2/3 pr-0 lg:pr-2">
                            <div className="p-6 bg-white rounded-md shadow-md">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">Orders Overview</h2>
                                <OrdersChart />
                            </div>
                        </div>

                        {/* User Profile Summary */}
                        <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
                            <div className="p-6 bg-white rounded-md shadow-md">
                                <h2 className="text-lg font-semibold text-gray-700 mb-4">Profile Summary</h2>
                                {/* <UserProfileCard user={user} /> */}
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="mt-8">
                        <div className="p-6 bg-white rounded-md shadow-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h2>
                            <RecentOrders />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;