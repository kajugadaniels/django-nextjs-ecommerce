import { Span } from 'next/dist/trace'
import Image from 'next/image'
import React from 'react'

const CartModel = () => {

    const cartItems = true

    return (
        <div className='w-max absolute right-0 mt-2 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-full flex flex-col gap-6 z-20'>
            {!cartItems ? (
                <div className=''>Cart is Empty</div>
            ) : (
                <div className='flex flex-col gap-8'>

                    <div className=' flex gap-4'>
                        <img
                            src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg"
                            alt=""
                            width={72}
                            height={96}
                            className='object-cover rounded-md'
                        />
                        <div className='flex flex-col justify-between w-full'>
                            <div className='flex items-center justify-between gap-8'>
                                <h3 className='font-semibold'>Product Name</h3>
                                <div className='p-1 bg-gray-50 rounded-sm'>$49</div>
                            </div>
                            <div className='text-sm text-gray-500'>
                                available
                            </div>

                            <div className='flex justify-between text-sm pt-5'>
                                <span className='text-gray-500'>QTY. 2</span>
                                <span className='text-blue-500'>Remove</span>
                            </div>
                        </div>
                    </div>
                    <div className=' flex gap-4'>
                        <img
                            src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg"
                            alt=""
                            width={72}
                            height={96}
                            className='object-cover rounded-md'
                        />
                        <div className='flex flex-col justify-between w-full'>
                            <div className='flex items-center justify-between gap-8'>
                                <h3 className='font-semibold'>Product Name</h3>
                                <div className='p-1 bg-gray-50 rounded-sm'>$49</div>
                            </div>
                            <div className='text-sm text-gray-500'>
                                available
                            </div>

                            <div className='flex justify-between text-sm pt-5'>
                                <span className='text-gray-500'>QTY. 2</span>
                                <span className='text-blue-500'>Remove</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartModel
