import Link from 'next/link'
import React from 'react'

const Card = () => {
    return (
        <div className="relative group mb-10">
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
                <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125" src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg" alt="" />
            </div>
            <div className="flex items-start justify-between mt-4 space-x-4">
                <div>
                    <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                        <Link href="/shop/1" title="">
                            Watermelon
                            <span className="absolute inset-0" aria-hidden="true"></span>
                        </Link>
                    </h3>
                </div>

                <div className="text-right">
                    <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">$99.00</p>
                </div>
            </div>
        </div>
    )
}

export default Card