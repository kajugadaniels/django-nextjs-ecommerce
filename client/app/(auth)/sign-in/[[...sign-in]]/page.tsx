'use client';

import { SignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function CustomSignIn() {
    const router = useRouter();

    const handleComplete = () => {
        router.push('/profile');
    };

    return (
        <SignIn
            appearance={{
                elements: {
                    rootBox: "mx-auto",
                    card: "bg-white shadow-md rounded-lg p-8",
                },
            }}
            afterSignInUrl="/profile"
            redirectUrl="/profile"
            onComplete={handleComplete}
        />
    );
}