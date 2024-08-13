"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CategoryFilter from '@/components/shared/CategoryFilter';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

interface Product {
    id: number;
    name: string;
    slug: string;
    image: string;
    unit_price: string;
    category: {
        name: string;
        slug: string;
    };
    description: string;
    date: string;
    updated: string;
}

const Shop: React.FC = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState('latest');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const itemsPerPage = 12;

    const placeholderImage = `${process.env.NEXT_PUBLIC_API_IMAGE_URL}/placeholder.png`;

    const router = useRouter();
    const { isSignedIn } = useUser();

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            let url = `${process.env.NEXT_PUBLIC_API_URL}/products/`;
            if (selectedCategory) {
                url += `category/${selectedCategory}/`;
            }
            const response = await axios.get(url);
            setAllProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    useEffect(() => {
        const sortedProducts = [...allProducts].sort((a, b) => {
            if (sortBy === 'latest') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            } else if (sortBy === 'price') {
                return parseFloat(a.unit_price) - parseFloat(b.unit_price);
            } else if (sortBy === '-price') {
                return parseFloat(b.unit_price) - parseFloat(a.unit_price);
            }
            return 0;
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayedProducts(sortedProducts.slice(startIndex, endIndex));
    }, [allProducts, currentPage, sortBy]);

    const handleShowMore = () => {
        if (currentPage * itemsPerPage < allProducts.length) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handleSort = (sortOption: string) => {
        setSortBy(sortOption);
        setCurrentPage(1);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleFilter = (categorySlug: string | null) => {
        setSelectedCategory(categorySlug);
        setCurrentPage(1);
    };

    const showNotification = (message: string, icon: 'success' | 'error') => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon: icon,
            title: message
        });
    };

    const addToCart = (product: Product) => {
        const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
        const existingItemIndex = cart.findIndex((item: Product) => item.id === product.id);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
            cart[existingItemIndex].timestamp = Date.now();
        } else {
            cart.push({ ...product, quantity: 1, timestamp: Date.now() });
        }

        localStorage.setItem('userCart', JSON.stringify(cart));
        showNotification('Product added to cart!', 'success');
    };

    const handleButtonClick = (product: Product) => {
        if (isSignedIn) {
            addToCart(product);
        } else {
            router.push('/sign-in');
        }
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
        <section className="bg-gray-100 py-8 antialiased dark:bg-gray-900 md:py-12 mt-40">
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
                    <div className="relative">
                        <button
                            id="sortDropdownButton1"
                            type="button"
                            onClick={toggleDropdown}
                            className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
                        >
                            <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
                            </svg>
                            Sort
                            <svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div id="dropdownSort1" className="absolute z-50 mt-2 w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-placement="bottom">
                                <ul className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="sortDropdownButton1">
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
                        )}
                    </div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <CategoryFilter handleFilter={handleFilter} selectedCategory={selectedCategory} />
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {displayedProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                className="relative bg-cover group rounded-3xl bg-center overflow-hidden mx-auto sm:mr-0 xl:mx-auto cursor-pointer"
                            >
                                <Link href={`/shop/${product.slug}`}>
                                    <img className="rounded-2xl" src={product.image || placeholderImage} alt={product.name} />
                                </Link>
                                <div className="absolute z-10 bottom-3 left-0 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-xl shadow-sm shadow-transparent transition-all duration-500 group-hover:shadow-indigo-200 group-hover:bg-indigo-50">
                                    <Link href={`/shop/${product.slug}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h6 className="font-semibold text-base leading-7 text-black">{product.name}</h6>
                                            <h6 className="font-semibold text-base leading-7 text-emerald-600 text-right">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(product.unit_price))}
                                            </h6>
                                        </div>
                                    </Link>
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-xs leading-5 text-gray-500">{product.category.name}</p>
                                        <button 
                                            className="p-2 bg-white hover:bg-emerald-900 text-white rounded-full shadow-lg transform transition-transform duration-700 ease-in-out hover:scale-110"
                                            onClick={() => handleButtonClick(product)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-900 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="m19.5 9.5l-.71-2.605c-.274-1.005-.411-1.507-.692-1.886A2.5 2.5 0 0 0 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5l.71-2.605c.274-1.005.411-1.507.692-1.886A2.5 2.5 0 0 1 7 4.172C7.44 4 7.96 4 9 4" />
                                                <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v4m8-4v4m-4-4v4" />
                                                <path strokeLinecap="round" d="M3.864 16.455c.546 2.183.819 3.274 1.632 3.91C6.31 21 7.435 21 9.685 21h4.63c2.25 0 3.375 0 4.19-.635c.813-.636 1.086-1.727 1.631-3.91c.858-3.432 1.287-5.147.387-6.301C19.622 9 17.853 9 14.316 9H9.685c-3.538 0-5.306 0-6.207 1.154c-.529.677-.6 1.548-.394 2.846" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {hasMore && (
                    <div className='flex justify-center mt-8'>
                        <button
                            onClick={handleShowMore}
                            className='px-4 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out'
                        >
                            Show More
                        </button>
                    </div>
                )}
                {isLoading && (
                    <div className="flex justify-center py-4">
                        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Shop;