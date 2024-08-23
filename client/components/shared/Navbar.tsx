"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SignedIn, SignedOut, useUser, useClerk } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartModel, { useCartItems } from './CartModel';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const cartItems = useCartItems();
    const cartRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { user } = useUser();
    const { signOut } = useClerk();

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const closeCart = () => setIsCartOpen(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
    const closeProfileDropdown = () => setIsProfileDropdownOpen(false);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) closeCart();
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) closeMobileMenu();
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) closeProfileDropdown();
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    useEffect(() => {
        closeCart();
        closeMobileMenu();
        closeProfileDropdown();
    }, [router]);

    const uniqueProductCount = new Set(cartItems.map(item => item.id)).size;

    return (
        <header className='fixed top-0 left-0 w-full z-50'>
            <div className="bg-green-800 border-b border-gray-700">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex items-center justify-between h-24 lg:h-[72px]">
                        <button 
                            type="button" 
                            className="p-2 -m-2 text-white transition-all duration-200 lg:hidden hover:text-white"
                            onClick={toggleMobileMenu}
                        >
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
                                    <Link href="/sign-in" className="text-base font-medium text-white transition-all duration-200 rounded hover:text-gray-300 focus:outline-none">
                                        Login
                                    </Link>
                                    <Link href="/sign-up" className="text-base font-medium text-white transition-all duration-200 rounded hover:text-gray-300 focus:outline-none">
                                        Register
                                    </Link>
                                </SignedOut>
                            </div>

                            <div className="flex items-center justify-end space-x-5 relative">
                                <span className="hidden w-px h-6 ml-6 bg-white lg:block" aria-hidden="true"></span>

                                <button type="button" className="p-2 -m-2 text-white transition-all duration-200 hover:text-gray-300">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>

                                <span className="w-px h-6 bg-gray-200 lg:hidden" aria-hidden="true"></span>

                                <div className="relative" ref={cartRef}>
                                    <button
                                        type="button"
                                        onClick={toggleCart}
                                        className="inline-flex items-center p-2 -m-2 text-white transition-all duration-200 lg:ml-6 hover:text-gray-300"
                                    >
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                        <div className="relative" ref={profileDropdownRef}>
                                            <button
                                                onClick={toggleProfileDropdown}
                                                className="flex items-center space-x-2 focus:outline-none"
                                            >
                                                <img
                                                    src={user?.imageUrl || 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg'}
                                                    alt="Profile"
                                                    className="w-8 h-8 rounded-full border-2 border-white"
                                                />
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                            </button>
                                            <AnimatePresence>
                                                {isProfileDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
                                                    >
                                                        <Link
                                                            href="/dashboard"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            onClick={closeProfileDropdown}
                                                        >
                                                            Dashboard
                                                        </Link>
                                                        <button
                                                            onClick={() => signOut(() => router.push('/'))}
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            Logout
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </SignedIn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-3">
                <div className="py-5">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <nav className="hidden lg:flex items-center space-x-8">
                            <Link href="/" className="text-sm font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-green-800">
                                Home
                            </Link>
                            <Link href="/shop" className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-green-800 focus:outline-none">
                                Shop
                            </Link>
                            <Link href="/contact" className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-green-800 focus:outline-none">
                                Contact Us
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        ref={mobileMenuRef}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden fixed inset-0 z-50 bg-white"
                    >
                        <div className="p-4">
                            <button
                                onClick={closeMobileMenu}
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <nav className="mt-8 space-y-4">
                                <Link href="/" className="block text-lg font-medium text-gray-900 hover:text-green-800" onClick={closeMobileMenu}>
                                    Home
                                </Link>
                                <Link href="/shop" className="block text-lg font-medium text-gray-900 hover:text-green-800" onClick={closeMobileMenu}>
                                    Shop
                                </Link>
                                <Link href="/contact" className="block text-lg font-medium text-gray-900 hover:text-green-800" onClick={closeMobileMenu}>
                                    Contact Us
                                </Link>
                                <SignedOut>
                                    <Link href="/sign-in" className="block text-lg font-medium text-gray-900 hover:text-green-800" onClick={closeMobileMenu}>
                                        Login
                                    </Link>
                                    <Link href="/sign-up" className="block text-lg font-medium text-gray-900 hover:text-green-800" onClick={closeMobileMenu}>
                                        Register
                                    </Link>
                                </SignedOut>
                                <SignedIn>
                                    <Link href="/dashboard" className="block text-lg font-medium text-gray-900 hover:text-green-800" onClick={closeMobileMenu}>
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => signOut(() => router.push('/'))}
                                        className="block text-lg font-medium text-gray-900 hover:text-green-800"
                                    >
                                        Logout
                                    </button>
                                </SignedIn>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;