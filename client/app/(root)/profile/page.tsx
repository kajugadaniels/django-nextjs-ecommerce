'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { getApiUrl } from '@/lib/apiConfig';

const Profile = () => {
    const { isLoaded, user } = useUser();
    const router = useRouter();
    const [userData, setUserData] = useState({
        clerk_id: '',
        email: '',
        first_name: '',
        last_name: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isLoaded && user) {
            setUserData({
                clerk_id: user.id,
                email: user.primaryEmailAddress?.emailAddress || '',
                first_name: user.firstName || '',
                last_name: user.lastName || ''
            });
        }
    }, [isLoaded, user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${getApiUrl()}/auth/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('User data submitted successfully');
                router.push('/');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to submit user data. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting user data:', error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoaded) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-900"></div>
        </div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 py-32">
            <h1 className="text-2xl font-bold mb-5">Complete Your Profile</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={userData.email}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100 text-gray-600"
                    />
                </div>
                <div>
                    <label htmlFor="first_name" className="block mb-1 font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        value={userData.first_name}
                        onChange={(e) => setUserData({...userData, first_name: e.target.value})}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-1 font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        value={userData.last_name}
                        onChange={(e) => setUserData({...userData, last_name: e.target.value})}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className={`w-full bg-emerald-800 text-white p-2 rounded hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-150 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </span>
                    ) : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Profile;