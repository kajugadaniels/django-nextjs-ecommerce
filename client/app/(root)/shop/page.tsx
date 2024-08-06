"use client";

import React from 'react';

interface CheckboxOption {
  label: string;
  checked: boolean;
}

const categories: CheckboxOption[] = [
  { label: 'TV, Audio-Video', checked: true },
  { label: 'Desktop PC', checked: true },
  { label: 'Gaming', checked: false },
  { label: 'Monitors', checked: false },
  { label: 'Laptops', checked: false },
  { label: 'Console', checked: false },
  { label: 'Tablets', checked: true },
  { label: 'Foto', checked: false },
  { label: 'Fashion', checked: false },
  { label: 'Books', checked: false }
];

// Define the ShopFilters component
const ShopFilters: React.FC = () => {
  const [checkboxStates, setCheckboxStates] = React.useState<CheckboxOption[]>(categories);

  const handleCheckboxChange = (index: number) => {
    setCheckboxStates(prevStates =>
      prevStates.map((item, idx) =>
        idx === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="flex flex-col w-64 h-full bg-card text-foreground p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <input
        type="text"
        placeholder="Search for categories"
        className="mb-4 p-2 border border-border rounded focus:outline-none focus:ring focus:ring-ring"
      />
      <div className="flex flex-col mb-4">
        {checkboxStates.map((option, index) => (
          <label key={index} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={option.checked}
              onChange={() => handleCheckboxChange(index)}
            />
            {option.label}
          </label>
        ))}
      </div>
      <a href="#" className="text-accent hover:underline">
        See more →
      </a>
      <h2 className="text-lg font-semibold mt-6 mb-4">Rating</h2>
      <h2 className="text-lg font-semibold mb-4">Price</h2>
      <h2 className="text-lg font-semibold mb-4">Shipping to</h2>
      <h2 className="text-lg font-semibold mb-4">Color</h2>
      <h2 className="text-lg font-semibold mb-4">Delivery Method</h2>
      <h2 className="text-lg font-semibold mb-4">Condition</h2>
      <h2 className="text-lg font-semibold mb-4">Weight</h2>
    </div>
  );
};

interface ProductCardProps {
  imageAlt: string;
  imageUrl: string;
  title: string;
  discount: string;
  price: string;
  rating: string;
  numRatings: string;
}

const cardClasses = 'bg-card rounded-lg shadow-md overflow-hidden h-2/3';
const primaryButtonClasses = 'bg-primary text-primary-foreground hover:bg-primary/80 w-full py-2 rounded';

const ProductCard: React.FC<ProductCardProps> = ({ imageAlt, imageUrl, title, discount, price, rating, numRatings }) => {
  return (
    <div className={cardClasses}>
      <img aria-hidden="true" alt={imageAlt} src={imageUrl} className="w-full h-auto" />
      <div className="p-10">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{discount}</p>
        <p className="text-xl font-bold">{price}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">{rating}</span>
          <span className="text-muted-foreground">({numRatings})</span>
        </div>
        <button className={primaryButtonClasses}>Add to cart</button>
      </div>
    </div>
  );
};

const products = [
  {
    imageAlt: 'Apple MacBook PRO Laptop',
    imageUrl: 'https://openui.fly.dev/openui/300x200.svg?text=Apple+MacBook+PRO+Laptop',
    title: 'Apple MacBook PRO Laptop with M2 chip',
    discount: 'Up to 5% off',
    price: '$2,599',
    rating: '★★★★★',
    numRatings: '(1,076)'
  },
  {
    imageAlt: 'Apple Watch SE',
    imageUrl: 'https://openui.fly.dev/openui/300x200.svg?text=Apple+Watch+SE',
    title: 'Apple Watch SE [GPS 40mm], Smartwatch',
    discount: 'Up to 20% off',
    price: '$699',
    rating: '★★★★★',
    numRatings: '(387)'
  },
  {
    imageAlt: 'Microsoft Surface Pro',
    imageUrl: 'https://openui.fly.dev/openui/300x200.svg?text=Microsoft+Surface+Pro',
    title: 'Microsoft Surface Pro, Copilot+ PC, 13 Inch',
    discount: 'Up to 35% off',
    price: '$899',
    rating: '★★★★★',
    numRatings: '(4,775)'
  }
];

const gridClasses = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4';
const showMoreButtonClasses = 'bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2 px-4 rounded';

const ProductGrid: React.FC = () => {
  return (
    <div className="flex ml-28">
      <div className="w-64 ml-10">
        <ShopFilters />
      </div>
      <div className={`flex-1 ml-10 ${gridClasses}`}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            imageAlt={product.imageAlt}
            imageUrl={product.imageUrl}
            title={product.title}
            discount={product.discount}
            price={product.price}
            rating={product.rating}
            numRatings={product.numRatings}
          />
        ))}
      </div>
    </div>
  );
};

const Shop: React.FC = () => {
  return (
    <div className="flex ml-10 mt-10">
      <div className="flex-1">
        <ProductGrid />
        <div className="text-center mt-6">
          <button className={showMoreButtonClasses}>Show More</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
