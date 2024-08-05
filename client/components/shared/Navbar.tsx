import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="bg-white border-b border-gray-100">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex items-center justify-between h-24 lg:h-[72px]">
                        <button type="button" className="p-2 -m-2 text-gray-900 transition-all duration-200 lg:hidden hover:text-gray-700">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div className="flex items-center flex-shrink-0 ml-4 lg:ml-0">
                            <a href="#" title="" className="inline-flex rounded focus:outline-none">
                                E-Greene
                            </a>
                        </div>

                        <div className="flex items-center justify-end ml-auto">
                            <div className="hidden lg:flex lg:items-center lg:space-x-8">
                                <a href="#" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none"> Create Free Account </a>

                                <a href="#" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none"> Login </a>
                            </div>

                            <div className="flex items-center justify-end space-x-5">
                                <span className="hidden w-px h-6 bg-white lg:block" aria-hidden="true"></span>

                                <button type="button" className="p-2 -m-2 text-gray-900 transition-all duration-200 hover:text-gray-700">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>

                                <span className="w-px h-6 bg-gray-200 lg:hidden" aria-hidden="true"></span>

                                <button type="button" className="inline-flex items-center p-2 -m-2 text-gray-900 transition-all duration-200 lg:ml-6 hover:text-gray-700">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs font-bold text-white bg-gray-600 rounded-full"> 2 </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="py-5">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <nav className="flex items-center space-x-8">
                            <a href="#" title="" className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none"> Home </a>
                            <a href="#" title="" className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none"> About Us </a>
                            <Link href="/shop" title="" className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none"> Shop </Link>
                            <a href="#" title="" className="text-sm font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none"> Contact Us </a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
