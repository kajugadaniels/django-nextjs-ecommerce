import React from 'react';

const CheckOutForm: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row p-6 bg-background rounded-lg shadow-lg">
            <div className="w-full md:w-1/2 p-4 ml-40">
                <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground">Full Name *</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-border rounded-md p-2"
                            placeholder="you names"
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
                            placeholder="your address"
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
                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-foreground">State</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border border-border rounded-md p-2"
                                placeholder="Rwanda"
                            />
                        </div>
                        <div className="w-1/2">
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
            <div className="w-full md:w-1/2 p-4">
                <h2 className="text-lg font-semibold mb-4">Your Order</h2>
                <div className="mb-4 border border-border rounded-md p-6 w-[250px] ">
                    <div className=" items-center">

                        <div>
                            <img src='gemin.jpeg' className='w-[200px]' />
                        </div>
                        <div className='mt-5'>
                            <h3 className="font-medium">Black Beans</h3>
                            <p className="text-sm">$120</p>
                            <div className="flex items-center">
                                <label className="mx-2">Quantity:</label>
                                <span className="mx-2">200</span>
                            </div>

                        </div>

                    </div>
                </div>
                <div className='bg-gray-100 p-4 border-rounded'>
                    <div className="flex justify-between mt-4">
                        <span>Subtotal:</span>
                        <span>$220.00</span>
                    </div>
                    <hr className='mt-6' />
                    <div className="flex justify-between mt-2">
                        <span>Delivery:</span>
                        <span>$2.00</span>
                    </div>
                    <hr className='mt-6' />
                    <div className="flex justify-between  mt-6 font-semibold">
                        <span>Total:</span>
                        <span>$222.00</span>
                    </div>
                </div>

                <div className="flex gap-24 mt-6 ml-28">
                    <button className="bg-gray-200 text-black p-4 rounded-lg w-1/3">Cancel Order</button>
                    <button className="bg-green-900 text-primary-foreground p-4 rounded-lg w-1/3">Place Order</button>
                </div>


            </div>
        </div>
    );
};

export default CheckOutForm;
