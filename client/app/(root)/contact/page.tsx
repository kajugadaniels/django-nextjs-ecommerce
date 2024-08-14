import React from 'react'

const Contact = () => {
    return (
        <div className="flex flex-col md:flex-row p-6 bg-background rounded-lg shadow-lg py-40">
            <div className="w-full md:w-1/2 p-4 ml-40">
                <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground">Full Name *</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-border rounded-md p-2"
                            placeholder="Your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground">Email Address *</label>
                        <input
                            type="email"
                            className="mt-1 block w-full border border-border rounded-md p-2"
                            placeholder="youremail@example.com"
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
                        <label className="block text-sm font-medium text-foreground">Message *</label>
                        <textarea
                            className="mt-1 block w-full border border-border rounded-md p-2"
                            placeholder="Your message"
                            rows={4}
                            required
                        />
                    </div>
                    <div className="flex gap-24 mt-6 ml-28">
                        <button type="reset" className="bg-gray-200 text-black p-4 rounded-lg w-1/3">Reset</button>
                        <button type="submit" className="bg-green-900 text-primary-foreground p-4 rounded-lg w-1/3">Send Message</button>
                    </div>
                </form>
            </div>
            <div className="w-full md:w-1/2 p-4">
                <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
                <div className="mb-4 border border-border rounded-md p-6 w-[250px] ">
                    <p className="font-medium">Address:</p>
                    <p className="text-sm">123 Main Street, Kigali, Rwanda</p>
                    <p className="font-medium mt-4">Phone:</p>
                    <p className="text-sm">+250 *** *** ***</p>
                    <p className="font-medium mt-4">Email:</p>
                    <p className="text-sm">info@example.com</p>
                </div>
            </div>
        </div>
    )
}

export default Contact