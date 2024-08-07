"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: string;
    description: string;
    date: string;
    updated: string;
    category: number;
}

const Shop = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState('latest');
    const itemsPerPage = 12;

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
            setAllProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const sortedProducts = [...allProducts].sort((a, b) => {
            if (sortBy === 'latest') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            } else if (sortBy === 'price') {
                return parseFloat(a.price) - parseFloat(b.price);
            } else if (sortBy === '-price') {
                return parseFloat(b.price) - parseFloat(a.price);
            }
            return 0;
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedProducts(sortedProducts.slice(startIndex, endIndex));
    }, [allProducts, currentPage, sortBy]);

    const handleShowMore = () => {
        if (currentPage * itemsPerPage < allProducts.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handleSort = (sortOption: string) => {
        setSortBy(sortOption);
        setCurrentPage(1);
    };

    const hasMore = currentPage * itemsPerPage < allProducts.length;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8"
                >
                    <div>
                        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shop</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button" className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
                            <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
                            </svg>
                            Sort
                            <svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                            </svg>
                        </button>
                        <div id="dropdownSort1" className="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-placement="bottom">
                            <ul className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="sortDropdownButton">
                                <li>
                                    <a href="#" onClick={() => handleSort('latest')} className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">Latest</a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => handleSort('price')} className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">Price (Low to High)</a>
                                </li>
                                <li>
                                    <a href="#" onClick={() => handleSort('-price')} className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">Price (High to Low)</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4"
                >
                    {displayedProducts.map((product) => (
                        <motion.div 
                            key={product.id} 
                            variants={itemVariants}
                            className='relative flex gap-x-4 gap-y-16 justify-between flex-wrap mb-10 group'
                        >
                            <Link href={`/product/${product.slug}`} className='w-full flex flex-col gap-5 relative'>
                                <div className='relative w-full h-80 overflow-hidden group'>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className='rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105'
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-70">
                                        <div className="absolute inset-x-0 bottom-0 flex justify-between px-16 py-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                            <button className="p-2 bg-white rounded-full shadow-lg transform transition-transform duration-700 ease-in-out hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4m2-2a2 2 0 100 4 2 2 0 000-4m-2-2v4M3 9h18M4 3h16m-5 6H7m0 0l-2 4m10 0h5l-2-4M7 19h6m-4 0a2 2 0 100 4 2 2 0 000-4" />
                                                </svg>
                                            </button>
                                            <button className="p-2 bg-white rounded-full shadow-lg transform transition-transform duration-700 ease-in-out hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                </svg>
                                            </button>
                                            <button className="p-2 bg-white rounded-full shadow-lg transform transition-transform duration-700 ease-in-out hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18m-6 4h6M6 18H3m3 0h6M12 12h6m-6 4h6m-6-8h6M3 2h18m-6 4h6M3 6h18M3 2h6M15 2h6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='font-medium'>{product.name}</span>
                                    <span className='font-semibold'>${product.price}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="w-full text-center mt-8"
                >
                    <button
                        type="button"
                        onClick={handleShowMore}
                        className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 transition-all duration-300 ease-in-out"
                        disabled={isLoading || !hasMore}
                    >
                        {isLoading ? 'Loading...' : hasMore ? 'Show more' : 'No more items'}
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Shop;
