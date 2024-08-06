import React from 'react';

interface ProductCardProps {
  imageAlt: string;
  imageUrl: string;
  title: string;
  discount: string;
  price: string;
  rating: string;
  numRatings: string;
}

const cardClasses = 'bg-card rounded-lg shadow-md overflow-hidden';
const primaryButtonClasses = 'bg-primary text-primary-foreground hover:bg-primary/80 mt-4 w-full py-2 rounded';

const ProductCard: React.FC<ProductCardProps> = ({ imageAlt, imageUrl, title, discount, price, rating, numRatings }) => {
  return (
    <div className={cardClasses}>
      <img aria-hidden="true" alt={imageAlt} src={imageUrl} />
      <div className="p-4">
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
    imageAlt: 'Apple iMac 27”',
    imageUrl: 'https://openui.fly.dev/openui/300x200.svg?text=Apple+iMac+27%E2%80%9D',
    title: 'Apple iMac 27”, 1TB HDD, Retina 5K Display, M3 Max',
    discount: 'Up to 35% off',
    price: '$1,699',
    rating: '★★★★★',
    numRatings: '(455)'
  },
  {
    imageAlt: 'Apple iPhone 15 Pro Max',
    imageUrl: 'https://openui.fly.dev/openui/300x200.svg?text=Apple+iPhone+15+Pro+Max',
    title: 'Apple iPhone 15 Pro Max, 256GB, Blue Titanium',
    discount: 'Up to 15% off',
    price: '$1,199',
    rating: '★★★★★',
    numRatings: '(1,233)'
  },
  {
    imageAlt: 'iPad Pro 13-Inch',
    imageUrl: 'https://openui.fly.dev/openui/300x200.svg?text=iPad+Pro+13-Inch',
    title: 'iPad Pro 13-Inch (M4): XDR Display, 512GB',
    discount: 'Up to 35% off',
    price: '$799',
    rating: '★★★★★',
    numRatings: '(879)'
  },
  {
    imageAlt: 'PlayStation 5 Console',
    imageUrl: 'https://openui.fly.dev/openui/300x200.svg?text=PlayStation+5+Console',
    title: 'PlayStation®5 Console – 1TB, PRO Controller',
    discount: 'Up to 10% off',
    price: '$499',
    rating: '★★★★★',
    numRatings: '(624)'
  },
  {
    imageAlt: 'Microsoft Xbox Series X',
    imageUrl: 'https://openui.fly.dev/openui/300x200.svg?text=Microsoft+Xbox+Series+X',
    title: 'Microsoft Xbox Series X 1TB Gaming Console',
    discount: 'Up to 10% off',
    price: '$499',
    rating: '★★★★★',
    numRatings: '(4,263)'
  },
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
    <>
      <div className={gridClasses}>
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
      <div className="flex justify-center mt-6">
        <button className={showMoreButtonClasses}>Show more</button>
      </div>
    </>
  );
};

const Shop: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <ProductGrid />
    </div>
  );
};

export default Shop;
