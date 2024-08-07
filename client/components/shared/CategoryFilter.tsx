import React, { useState } from 'react';

const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Toys',
    'Automotive',
    'Books',
    'Health',
    'Beauty',
];

const CategoryFilter: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="w-full md:max-w-sm">
            <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full">
                <h6 className="font-medium text-base leading-7 text-black mb-5">Filter by Category</h6>
                
                <ul className="space-y-2 mb-5">
                    {categories.map((category, index) => (
                        <li key={index} className="flex items-center">
                            <input
                                id={`category-${index}`}
                                type="checkbox"
                                className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
                            />
                            <label htmlFor={`category-${index}`} className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">
                                {category}
                            </label>
                        </li>
                    ))}
                </ul>
                
                <button
                    className="w-full py-2.5 flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white font-semibold text-xs shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-200"
                    onClick={toggleDropdown}
                >
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.4987 13.9997L13.1654 12.6663M13.832 7.33301C13.832 10.6467 11.1457 13.333 7.83203 13.333C4.51832 13.333 1.83203 10.6467 1.83203 7.33301C1.83203 4.0193 4.51832 1.33301 7.83203 1.33301C11.1457 1.33301 13.832 4.0193 13.832 7.33301Z"
                            stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                        />
                    </svg>
                    Filter
                </button>
            </div>
        </div>
    );
};

export default CategoryFilter;
