"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface ProductData {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    category: number;
    images: string[];
}

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState<ProductData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        const fetchProduct = async () => {
            if (slug) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}/`);
                    setProduct(response.data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchProduct();
    }, [slug]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="slider-box w-full h-full max-lg:mx-auto mx-0">
                        <Swiper
                            className="main-slide-carousel swiper-container relative mb-6"
                            spaceBetween={10}
                            slidesPerView={1}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                        >
                            {product.images.map((image, index) => (
                                <SwiperSlide key={index} className="swiper-slide">
                                    <div className="block">
                                        <img src={image} alt={`${product.name} image ${index + 1}`} className="max-lg:mx-auto rounded-2xl" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="pro-detail w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
                            <div className="flex items-center justify-between gap-6 mb-6">
                                <div className="text">
                                    <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2">{product.name}</h2>
                                    <p className="font-normal text-base text-gray-500">{product.category}</p>
                                </div>
                                <button className="group transition-all duration-500 p-0.5">
                                    {/* ... (Wishlist button SVG remains the same) */}
                                </button>
                            </div>
                            <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3">
                                <div className="flex items-center">
                                    <h5 className="font-manrope font-semibold text-2xl leading-9 text-gray-900">${product.price}</h5>
                                </div>
                            </div>
                            <p className="font-manrope font-normal text-sm text-gray-500 mb-6">
                                {product.description}
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-6">
                                <div className="quantity">
                                    <label htmlFor="Qty" className="font-manrope text-sm font-semibold text-gray-900 mb-1 inline-block">Quantity</label>
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            className="w-10 h-10 bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors duration-300"
                                            onClick={handleDecrease}
                                        >
                                            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 1H1" stroke="#111827" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                        <input
                                            type="text"
                                            className="w-16 py-2 text-center bg-white border-0 outline-none focus:ring-0"
                                            value={quantity}
                                            readOnly
                                        />
                                        <button
                                            className="w-10 h-10 bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors duration-300"
                                            onClick={handleIncrease}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 1V11M11 6H1" stroke="#111827" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <button className="bg-emerald-800 hover:bg-emerald-900 text-white font-manrope text-base font-bold leading-5 py-3.5 px-8 rounded-full transition-all duration-500">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;