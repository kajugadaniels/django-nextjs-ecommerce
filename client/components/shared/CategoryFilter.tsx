import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface CategoryFilterProps {
    handleFilter: (categorySlug: string | null) => void;
    selectedCategory: string | null;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ handleFilter, selectedCategory }) => {
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

    const handleCategoryClick = (categorySlug: string | null) => {
        handleFilter(categorySlug);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full md:max-w-sm">
            <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full">
                <h6 className="font-medium text-base leading-7 text-black mb-5">Filter by Category</h6>
                <ul className="space-y-2 mb-5">
                    <li
                        key="all"
                        className={`flex items-center cursor-pointer ${!selectedCategory ? 'text-emerald-800 font-semibold' : 'text-black'}`}
                        onClick={() => handleCategoryClick(null)}
                    >
                        All
                    </li>
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className={`flex items-center text-xs font-normal cursor-pointer ${selectedCategory === category.slug ? 'text-emerald-800 font-semibold' : 'text-black'}`}
                            onClick={() => handleCategoryClick(category.slug)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryFilter;