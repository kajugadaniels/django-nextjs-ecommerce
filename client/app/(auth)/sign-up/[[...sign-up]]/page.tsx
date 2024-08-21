'use client';

import { SignUp } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function CustomSignUp() {
    const router = useRouter();

    const handleComplete = (result: any) => {
        console.log('SignUp completed:', result);
        router.push('/profile');
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
            onComplete={handleComplete}
        />
    );
}