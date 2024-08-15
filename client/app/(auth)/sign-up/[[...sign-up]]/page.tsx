'use client';

import { SignUp, useSignUp } from "@clerk/nextjs";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomSignUp() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [isSignUpComplete, setIsSignUpComplete] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded || !isSignUpComplete || !signUp?.createdUserId) return;

        const syncUserWithDjango = async () => {
            const userData = {
                clerkUserId: signUp.createdUserId,
                email: signUp.emailAddress,
                firstName: signUp.firstName,
                lastName: signUp.lastName,
            };
            console.log('Attempting to sync user with Django:', userData);

            try {
                const response = await fetch('/api/sync-user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });

                const responseData = await response.json();
                console.log('Response from sync-user API:', responseData);

                if (response.ok) {
                    console.log('User synced with Django successfully');
                    await setActive({ session: signUp.createdSessionId });
                    router.push('/');
                } else {
                    console.error('Failed to sync user with Django');
                }
            } catch (error) {
                console.error('Error syncing user with Django:', error);
            }
        };

        syncUserWithDjango();
    }, [isLoaded, isSignUpComplete, signUp, setActive, router]);

    const handleComplete = () => {
        setIsSignUpComplete(true);
    };

    return (
        <SignUp
            appearance={{
                elements: {
                    rootBox: "mx-auto",
                    card: "bg-white shadow-md rounded-lg p-8",
                },
            }}
            afterSignUpUrl="/"
            redirectUrl="/"
        />
    );
}