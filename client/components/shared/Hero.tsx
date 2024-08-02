import React from 'react'
import { Button } from '../ui/button'

const Hero = () => {
    return (
        <div className="relative pt-12 bg-gray-50 sm:pt-16 lg:py-36 xl:py-48">
            <div className="absolute inset-0 hidden lg:block">
                <img className="object-cover object-right w-full h-full" src="/hero/1.jpg" alt="" />
                <div className="absolute inset-0 bg-emerald-800 opacity-40"></div>
            </div>

            <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-lg mx-auto text-center lg:mx-0 lg:max-w-md lg:text-left">
                    <p className="text-base font-bold text-white">Fresh, Quality Products Delivered to Your Doorstep</p>
                    <h1 className="mt-3 text-2xl font-bold text-white sm:mt-8 sm:text-3xl xl:text-5xl">Discover the Best Selection of Long-Lasting Produce.</h1>

                    <div className="mt-8 sm:mt-12">
                        <Button className='px-10 py-6 bg-emerald-800 hover:bg-emerald-900'>Start Shopping</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
