'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

const Profile = () => {
    const { isLoaded, user } = useUser();
    const router = useRouter();
    const [userData, setUserData] = useState({
        clerk_id: '',
        email: '',
        first_name: '',
        last_name: ''
    });

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
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/`, {
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
                console.error('Failed to submit user data');
            }
        } catch (error) {
            console.error('Error submitting user data:', error);
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 py-32">
            <h1 className="text-2xl font-bold mb-5">Complete Your Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={userData.email}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label htmlFor="first_name" className="block mb-1">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        value={userData.first_name}
                        onChange={(e) => setUserData({...userData, first_name: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-1">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        value={userData.last_name}
                        onChange={(e) => setUserData({...userData, last_name: e.target.value})}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-emerald-800 text-white p-2 rounded hover:bg-emerald-700">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Profile;