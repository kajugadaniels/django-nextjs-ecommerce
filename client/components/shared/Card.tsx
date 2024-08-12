"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

interface Product {
    id: number;
    name: string;
    slug: string;
    image: string;
    unit_price: string;
    description: string;
    date: string;
    updated: string;
    category: {
        name: string;
    };
}

const Card = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const router = useRouter();
    const { isSignedIn } = useUser();

    const placeholderImage = `${process.env.NEXT_PUBLIC_API_IMAGE_URL}`;

    const handleButtonClick = () => {
        if (isSignedIn) {
            router.push('/cart');
        } else {
            router.push('/sign-in');
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
                const allProducts: Product[] = response.data;

                // Shuffle and limit to 4 products
                const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
                const selectedProducts = shuffledProducts.slice(0, 4);

                setProducts(selectedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    className="relative bg-cover group rounded-3xl bg-center overflow-hidden mx-auto sm:mr-0 xl:mx-auto cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}

                >
                    <Link href={`/shop/${product.slug}`}>
                        <img className="rounded-2xl" src={product.image || placeholderImage} alt={product.name} data-aos="fade-up"
                            data-aos-duration="3000" />
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
                                onClick={handleButtonClick}
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
        </div>
    );
};

export default Card;
