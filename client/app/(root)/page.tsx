import Card from '@/components/shared/Card';
import Hero from '@/components/shared/Hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Home = () => {
    return (
        <>
            <Hero />

            <section className="py-10 bg-white sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl" data-aos="fade-up"
                            data-aos-duration="3000">How does it work?</h2>
                        <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600" data-aos="fade-up" data-aos-duration="3000">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
                    </div>

                    <div className="relative mt-12 lg:mt-20">
                        <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                            <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                        </div>

                        <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                            <div data-aos="fade-up"
                                data-aos-duration="3000">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-gray-700"> 1 </span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10" >Step One</h3>
                                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                            </div>

                            <div data-aos="fade-up"
                                data-aos-duration="3000">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-gray-700"> 2 </span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Step Two</h3>
                                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                            </div>

                            <div data-aos="fade-up"
                                data-aos-duration="3000">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                    <span className="text-xl font-semibold text-gray-700"> 3 </span>
                                </div>
                                <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Step Three</h3>
                                <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-12 bg-gray-100 sm:py-16 lg:py-20">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-md mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl" data-aos="fade-up"
                            data-aos-duration="3000">Our featured items</h2>
                        <p className="mt-4 text-base font-normal leading-7 text-gray-600" data-aos="fade-up"
                            data-aos-duration="3000">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus faucibus massa dignissim tempus.</p>
                    </div>
                    <Card />
                </div>
            </section>

            <div className="relative overflow-hidden bg-white">
                <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg" data-aos="fade-up"
                            data-aos-duration="3000">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Fresh Products
                            </h1>
                            <p className="mt-4 text-xl text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, voluptate!
                            </p>
                        </div>
                        <div>
                            <div className="mt-10">
                                {/* Decorative image grid */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                >
                                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                    <img
                                                        alt=""
                                                        src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg"
                                                        className="h-full w-full object-cover object-center"
                                                        data-aos="fade-up"
                                                        data-aos-duration="3000"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg"
                                                        className="h-full w-full object-cover object-center"
                                                        data-aos="fade-up"
                                                        data-aos-duration="3000"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg"
                                                        className="h-full w-full object-cover object-center"
                                                        data-aos="fade-up"
                                                        data-aos-duration="3000"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg"
                                                        className="h-full w-full object-cover object-center"
                                                        data-aos="fade-up"
                                                        data-aos-duration="3000"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg"
                                                        className="h-full w-full object-cover object-center"
                                                        data-aos="fade-up"
                                                        data-aos-duration="3000"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg"
                                                        className="h-full w-full object-cover object-center"
                                                        data-aos="fade-up"
                                                        data-aos-duration="3000"
                                                    />
                                                </div>
                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                    <img
                                                        alt=""
                                                        src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg"
                                                        className="h-full w-full object-cover object-center"
                                                        data-aos="fade-up"
                                                        data-aos-duration="3000"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link href='/shop'>
                                    <Button className='px-10 py-6 bg-emerald-800 hover:bg-emerald-900 text-white'>Start Shopping</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
