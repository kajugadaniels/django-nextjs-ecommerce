import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = () => {
    return (
        <div className='flex gap-x-4 gap-y-16 justify-between flex-wrap'>
            <Link href='' className='w-full flex flex-col gap-5'>
                <div className='relative w-full h-80'>
                    <img
                        src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg"
                        alt=""
                        sizes="25vw"
                        className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
                    />
                    <img
                        src="https://www.heynutritionlady.com/wp-content/uploads/2023/05/How_to_Cook_Kidney_Beans-SQ.jpg"
                        alt=""
                        sizes="25vw"
                        className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'
                    />
                </div>
                <div className='flex justify-between'>
                    <span className='font-medium'>Product Name</span>
                    <span className='font-semibold'>$49</span>
                </div>
                <div className='text-sm text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, numquam.
                </div>
                <button className='rounded-2xl h-9 ring-1 ring-emerald-800 text-emerald-800 text-xs hover:bg-emerald-900 hover:text-white'>Add to Cart</button>
            </Link>
        </div>
    )
}

export default Card