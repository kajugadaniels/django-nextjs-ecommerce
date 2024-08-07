import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
    id: number;
    name: string;
}

const CategoryFilter: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Category[] = await response.json();
                setCategories(data);
            } catch (error) {
                setError('Failed to fetch categories');
                console.error('Failed to fetch categories:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleFilter = (categoryId: number | null) => {
        console.log('Selected category:', categoryId);
        // Implement your filtering logic here
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full md:max-w-sm">
            <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full">
                <h6 className="font-medium text-base leading-7 text-black mb-5">Filter by Category</h6>
                
                <ul className="space-y-2 mb-5">
                    {categories.map((category) => (
                        <li key={category.id} className="flex items-center">
                            <Link href={`#`} onClick={() => handleFilter(category.id)} className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                
                <button
                    className="w-full py-2.5 flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white font-semibold text-xs shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-200"
                    onClick={() => handleFilter(null)}
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
