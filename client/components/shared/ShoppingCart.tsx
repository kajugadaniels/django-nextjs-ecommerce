import React from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  display: string;
  price: number;
  quantity: number;
}

const ShoppingCart: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'iPhone 12 Pro',
      image: 'https://appletoolbox.com/wp-content/uploads/2020/10/Apple-iPhone-12-Pro-image.jpeg',
      display: '6.1-inch display',
      price: 999,
      quantity: 3,
    },
  ];

  const subTotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8">Shopping Cart</h2>
        <div className="grid grid-cols-5 text-sm font-medium text-gray-700 border-b py-2">
          <div className="col-span-2">PRODUCT</div>
          <div className="text-center">PRICE</div>
          <div className="text-center">QUANTITY</div>
          <div className="text-right">TOTAL</div>
        </div>

        {products.map((product) => (
          <div key={product.id} className="grid grid-cols-5 gap-4 items-center py-4 border-b">
            <div className="flex col-span-2 items-center">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="ml-4">
                <h5 className="font-semibold">{product.name}</h5>
                <p className="text-gray-500">{product.display}</p>
                <button className="text-indigo-600 mt-2">Remove</button>
              </div>
            </div>
            <div className="text-center text-lg">${product.price.toFixed(2)}</div>
            <div className="flex justify-center items-center">
              <button className="px-3 py-1 border rounded-l bg-gray-200">-</button>
              <input
                type="text"
                className="w-12 text-center border-y"
                value={product.quantity}
                readOnly
              />
              <button className="px-3 py-1 border rounded-r bg-gray-200">+</button>
            </div>
            <div className="text-right text-lg font-semibold">${(product.price * product.quantity).toFixed(2)}</div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-8">
          <button className="px-6 py-2 bg-gray-200 text-gray-600 rounded">Clear Cart</button>
          <div className="text-right">
            <p className="text-lg font-medium">Subtotal: ${subTotal.toFixed(2)}</p>
            <p className="text-gray-500">Taxes and shipping calculated at checkout.</p>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded">Check out</button>
          </div>
        </div>

        <div className="mt-4">
          <button className="text-indigo-600 flex items-center">
            <span>&larr;</span> Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
