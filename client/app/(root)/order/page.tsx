import React from 'react'

const order = () => {
    return (
        <div className='bg-gray-50 py-20'>
            <h2 className="text-3xl font-extrabold text-green-800 text-center pt-20 md:pt-44">Order Detail</h2>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-12 mb-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
                        <input
                            type="text"
                            placeholder="Search by Order ID"
                            className="bg-white text-gray-600 px-4 md:px-12 py-3 border rounded-l focus:outline-none w-full md:w-auto"
                        />
                        <button className="bg-green-800 text-white px-4 py-2 rounded-r w-full md:w-auto">
                            Search
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <select className="bg-white text-gray-500 px-4 py-2 border rounded w-full md:w-auto">
                            <option>Filter by: Completed</option>
                            <option>Completed</option>
                            <option>pre-order</option>
                            <option>In Transit</option>
                            <option>Cancelled</option>
                        </select>
                        <select className="bg-white text-gray-500  px-4 py-2 border rounded w-full md:w-auto">
                            <option>Last 7 days</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <img src='gemin.jpeg' alt='' className='w-28 h-28' />
                        <div>
                            <h3 className="font-semibold text-gray-800">beans</h3>
                            <p className="text-sm text-gray-600">Qty: 3</p>
                            <p className="font-semibold text-emerald-900">$900</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                            <div className="flex space-x-2">
                                <span className="text-gray-400">Order ID:</span>
                                <span className="text-black font-semibold">#FWB1273643</span>
                            </div>
                            <span className="text-green-800 bg-gray-300 px-2 py-1 text-sm rounded">Pre-order</span>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                            <button className="bg-red-600 text-white px-4 py-2 rounded w-full md:w-auto">Cancel order</button>
                            <button className="bg-white text-white px-4 py-2 rounded w-full md:w-auto">Track order</button>
                            <button className="bg-white text-white px-4 py-2 rounded w-full md:w-auto">Order details</button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <a href="#" className="text-green-800 underline">Download invoice</a>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                        <div>
                            <span className="text-gray-400">Order date:</span>
                            <span className="text-gray-600 ml-2">24 January 2024</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Email:</span>
                            <span className="text-gray-600 ml-2">name@example.com</span>
                        </div>
                        <div>
                            <span className="text-gray-400">Payment method:</span>
                            <span className="text-gray-600 ml-2">Credit card</span>
                        </div>
                    </div>
                    <hr />

                    <div className="bg-white p-4 rounded-lg">
                        <span className="text-orange-400">Expected delivery on Monday 16 Jul 2024</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default order
