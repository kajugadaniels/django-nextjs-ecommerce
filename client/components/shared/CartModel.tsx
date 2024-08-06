import React, { useState } from 'react';
import Image from 'next/image';

interface CartModelProps {
  onClose: () => void;
}

const CartModel: React.FC<CartModelProps> = ({ onClose }) => {
  const cartItems = true;

  return (
    <div className='w-max absolute right-0 mt-2 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-full flex flex-col gap-6 z-20'>
      {!cartItems ? (
        <div className='text-xl'>Cart is Empty</div>
      ) : (
        <>
          <div className='flex justify-between'>
            <h1 className=''>Shopping Cart</h1>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className='flex flex-col gap-8'>
            <div className='flex gap-4'>
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
                <div className='text-sm text-gray-500'>available</div>
                <div className='flex justify-between text-sm pt-5'>
                  <span className='text-gray-500'>QTY. 2</span>
                  <span className='text-blue-500'>Remove</span>
                </div>
              </div>
            </div>
            <div className='flex gap-4'>
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
                <div className='text-sm text-gray-500'>available</div>
                <div className='flex justify-between text-sm pt-5'>
                  <span className='text-gray-500'>QTY. 2</span>
                  <span className='text-blue-500'>Remove</span>
                </div>
              </div>
            </div>
          </div>
          <div className=''>
            <div className='flex items-center justify-between font-semibold'>
              <span>Subtotal</span>
              <div>$46</div>
            </div>
            <p className='text-gray-500 text-sm mt-2 mb-4'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <div className='flex justify-between text-sm'>
              <button className='rounded-md px-3 py-4 ring-1 ring-gray-300'>View Carts</button>
              <button className='rounded-md px-3 py-4 bg-black text-white'>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ParentComponent: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <div>
      <button onClick={handleCartOpen}>Open Cart</button>
      {isCartOpen && <CartModel onClose={handleCartClose} />}
    </div>
  );
};

export default ParentComponent;
