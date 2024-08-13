"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CartModel, { useCartItems } from './CartModel'; // Ensure CartModel is correctly imported

const Navbar: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItems = useCartItems();
    const cartRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                closeCart();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        closeCart();
    }, [pathname]);

    // Count unique products in cart
    const uniqueProductCount = new Set(cartItems.map(item => item.id)).size;

    return (
        <header className='fixed top-0 left-0 w-full z-50'>
            <div className="bg-green-800 border-b border-gray-700">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex items-center justify-between h-24 lg:h-[72px]">
                        <button type="button" className="p-2 -m-2 text-gray-900 transition-all duration-200 lg:hidden hover:text-gray-700">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div className="flex items-center flex-shrink-0 ml-4 lg:ml-0">
                            <Link href="/" className="inline-flex rounded focus:outline-none text-white">
                                E-Greene
                            </Link>
                        </div>

                        <div className="flex items-center justify-end ml-auto">
                            <div className="hidden lg:flex lg:items-center lg:space-x-8">
                                <SignedOut>
                                    <Link href="/sign-in" className="text-base font-medium text-white transition-all duration-200 rounded hover:text-gray-700 focus:outline-none">
                                        Login
                                    </Link>
                                    <Link href="/sign-up" className="text-base font-medium text-white transition-all duration-200 rounded hover:text-gray-700 focus:outline-none">
                                        Register
                                    </Link>
                                </SignedOut>
                            </div>

                            <div className="flex items-center justify-end space-x-5 relative">
                                <span className="hidden w-px h-6 ml-6 bg-white lg:block" aria-hidden="true"></span>

                                <button type="button" className="p-2 -m-2 text-gray-900 transition-all duration-200 hover:text-gray-700">
                                    <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>

                                <span className="w-px h-6 bg-gray-200 lg:hidden" aria-hidden="true"></span>

                                <div className="relative" ref={cartRef}>
                                    <button
                                        type="button"
                                        onClick={toggleCart}
                                        className="inline-flex items-center p-2 -m-2 text-gray-900 transition-all duration-200 lg:ml-6 hover:text-gray-700"
                                    >
                                        <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        {uniqueProductCount > 0 && (
                                            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                                                {uniqueProductCount}
                                            </span>
                                        )}
                                    </button>
                                    {isCartOpen && <CartModel onClose={closeCart} />}
                                </div>

                                <div className="hidden lg:flex lg:items-center lg:space-x-8">
                                    <SignedIn>
                                        <UserButton afterSignOutUrl='/' />
                                    </SignedIn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="py-5">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <nav className="flex items-center space-x-8">
                            <Link href="/" className="text-sm font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-green-800 hover:underline">
                                Home
                            </Link>
                            <Link href="/shop" className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-green-800 hover:underline focus:outline-none">
                                Shop
                            </Link>
                            <Link href="/contact" className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-green-900 hover:underline focus:outline-none">
                                Contact Us
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;