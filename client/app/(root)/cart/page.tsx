import React from 'react'

function ViewCart() {
    return (
        <section className="py-12 ">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <h2 className="text-2xl font-bold text-center mb-8">Shopping Cart</h2>
                <div className='bg-gray-100 p-10 rounded-lg'>
                    <div className="grid grid-cols-5 text-sm font-medium text-gray-700 border-b py-2">
                        <div className="col-span-2 font-bold">PRODUCT</div>
                        <div className="text-center font-bold">PRICE</div>
                        <div className="text-center font-bold">QUANTITY</div>
                        <div className="text-right font-bold">TOTAL</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 items-center py-4 border-b">
                        <div className="flex col-span-2 items-center">
                            <img src='' alt='' className="w-20 h-20 object-cover rounded-lg" />
                            <div className="ml-4">
                                <h5 className="font-semibold">Beans</h5>
                                <p className="text-gray-500">jsak</p>
                                <button className="text-green-900 mt-2">Remove</button>
                            </div>
                        </div>
                        <div className="text-center text-lg">$30</div>
                        <div className="flex justify-center items-center">
                            <button className="px-3 py-1 border rounded-l bg-gray-200">-</button>
                            <input
                                type="text"
                                className="w-12 text-center border-y"
                                value='1'
                                readOnly
                            />
                            <button className="px-3 py-1 border rounded-r bg-gray-200">+</button>
                        </div>
                        <div className="text-right text-lg font-semibold">$3</div>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <button className="px-6 py-2 bg-gray-200 text-gray-600 rounded">Clear Cart</button>
                        <div className="text-right">
                            <p className="text-lg font-medium">Subtotal: $400</p>
                            <button className="mt-4 px-6 py-3 bg-green-900 text-white rounded">Check out</button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button className="text-green-900 flex items-center">
                            <span>&larr;</span> Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ViewCart