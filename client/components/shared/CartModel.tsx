import Image from 'next/image'
import React from 'react'

const CartModel = () => {

    const cartItems = true

    return (
        <div className='absolute right-0 mt-2 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-full flex flex-col gap-6 z-20'>
            {!cartItems ? (
                <div className=''>Cart is Empty</div>
            ) : (
                <div className=''>
                    <img
                        src="https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg"
                        alt=""
                        width={72}
                        height={96}
                        className='object-cover rounded-md'
                    />
                    <div className=''>
                        <div className=''>
                            <h3>Product Name</h3>
                            <div className=''>$49</div>
                        </div>
                        <div className=''>
                            available
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartModel
