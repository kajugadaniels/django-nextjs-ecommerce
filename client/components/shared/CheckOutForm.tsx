import React from 'react';

const CheckOutForm: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row p-6 bg-background rounded-lg shadow-lg">
            <div className="w-full lg:w-1/2 p-4 lg:ml-32">
                <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground">Full Name *</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-border rounded-md p-2"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground">Phone Number *</label>
                        <input
                            type="tel"
                            className="mt-1 block w-full border border-border rounded-md p-2"
                            placeholder="+250 *** *** ***"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground">Address</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-border rounded-md p-2"
                            placeholder="Your Address"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground">Country</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-border rounded-md p-2"
                            placeholder="Rwanda"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
                        <div className="w-full md:w-1/2">
                            <label className="block text-sm font-medium text-foreground">State</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border border-border rounded-md p-2"
                                placeholder="Rwanda"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <label className="block text-sm font-medium text-foreground">City</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border border-border rounded-md p-2"
                                placeholder="Kigali City"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground">Zip / Postal Code</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-border rounded-md p-2"
                            placeholder="380 005"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground">Select the Delivery Address *</label>
                        <select className="mt-1 block w-full border border-border rounded-md p-2">
                            <option>Home</option>
                            <option>Office (10AM to 5PM)</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="w-full lg:w-1/2 p-4">
                <h2 className="text-lg font-semibold mb-4">Your Order</h2>
                <div className="mb-4 border border-border rounded-md p-2 w-1/2 max-w-xs md:max-w-sm">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <div>
                            <img src="gemin.jpeg" className="w-full md:w-[150px] lg:w-[200px] mx-auto" alt="Product" />
                        </div>
                        <div className="mt-5 md:mt-0 md:ml-4">
                            <h3 className="font-medium">Black Beans</h3>
                            <p className="text-sm">$120</p>
                            <div className="flex items-center mt-2">
                                <label className="mr-2">Quantity:</label>
                                <span>200</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 text-black p-4 rounded-lg w-full md:w-4/5">
                    <div className="flex justify-between mt-4">
                        <span>Subtotal:</span>
                        <span>$220.00</span>
                    </div>
                    <hr className="mt-6" />
                    <div className="flex justify-between mt-2">
                        <span>Delivery:</span>
                        <span>$2.00</span>
                    </div>
                    <hr className="mt-6" />
                    <div className="flex justify-between mt-6 font-semibold">
                        <span>Total:</span>
                        <span>$222.00</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 mt-6 ">
                    <button className="bg-gray-200 text-black p-4 rounded-lg w-full md:w-1/3">Cancel Order</button>
                    <button className="bg-green-900 text-primary-foreground p-4 rounded-lg w-full md:w-1/3">Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default CheckOutForm;
