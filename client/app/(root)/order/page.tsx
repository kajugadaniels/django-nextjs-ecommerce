import React from 'react'

const page = () => {
    return (
        <div className="max-w-4xl mx-auto bg-gray-300 p-6 rounded-lg shadow-lg mt-72">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Search by Order ID"
                        className="bg-white text-gray-600 px-4 py-2 rounded-l focus:outline-none"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-r">
                        Search
                    </button>
                </div>
                <div className="flex space-x-4">
                    <select className="bg-white text-gray-500 px-4 py-2 rounded">
                        <option>Filter by: Completed</option>
                    </select>
                    <select className="bg-white text-gray-500  px-4 py-2 rounded">
                        <option>Last 7 days</option>
                    </select>
                </div>
            </div>


            <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-400">Order ID:</span>
                        <span className="text-black font-semibold">#FWB1273643</span>
                        <span className="text-blue-500 bg-gray-600 px-2 py-1 text-sm rounded">Pre-order</span>
                    </div>
                    <div className="flex space-x-4">
                        <button className="bg-red-600 text-white px-4 py-2 rounded">Cancel order</button>
                        <button className="bg-white text-white px-4 py-2 rounded">Track order</button>
                        <button className="bg-white text-white px-4 py-2 rounded">Order details</button>
                    </div>
                </div>

                <div className="mb-4">
                    <a href="#" className="text-green-800 underline">Download invoice</a>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div>
                        <span className="text-gray-400">Order date:</span>
                        <span className="text-white ml-2">24 January 2024</span>
                    </div>
                    <div>
                        <span className="text-gray-400">Email:</span>
                        <span className="text-gray-600 ml-2">name@example.com</span>
                    </div>
                    <div>
                        <span className="text-gray-400">Payment method:</span>
                        <span className="text-ray-600 ml-2">Credit card</span>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                    <span className="text-orange-400">Expected delivery on Monday 16 Jul 2024</span>
                </div>
            </div>
        </div>
    )
}

export default page