'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const Card = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
            {products.map((product) => (
                <div key={product.id} className='flex gap-x-4 gap-y-16 justify-between flex-wrap'>
                    <Link href={`/product/${product.slug}`} className='w-full flex flex-col gap-5'>
                        <div className='relative w-full h-80'>
                            <img
                                src={product.image}
                                alt={product.name}
                                className='w-full h-full object-cover rounded-md'
                            />
                        </div>
                        <div className='flex justify-between'>
                            <span className='font-medium'>{product.name}</span>
                            <span className='font-semibold'>${product.price}</span>
                        </div>
                        <div className='text-sm text-gray-500'>
                            {product.description}
                        </div>
                        <button className='rounded-2xl h-9 ring-1 ring-emerald-800 text-emerald-800 text-xs hover:bg-emerald-900 hover:text-white'>Add to Cart</button>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Card