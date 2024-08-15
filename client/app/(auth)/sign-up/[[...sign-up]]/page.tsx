'use client';

import { SignUp } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function CustomSignUp() {
    const router = useRouter();

    const handleComplete = (result: any) => {
        console.log('SignUp completed:', result);
        
        // Redirect to profile page with user data as query parameters
        router.push(`/profile?clerk_id=${result.createdUserId}&email=${encodeURIComponent(result.emailAddress)}&first_name=${encodeURIComponent(result.firstName)}&last_name=${encodeURIComponent(result.lastName)}`);
    };

    return (
        <SignUp
            appearance={{
                elements: {
                    rootBox: "mx-auto",
                    card: "bg-white shadow-md rounded-lg p-8",
                },
            }}
            afterSignUpUrl="/profile"
            redirectUrl="/profile"
        />
    );
}