'use client';

import { SignUp, useSignUp } from "@clerk/nextjs";
import { createUserInDjango } from '../../../utils/userSync';
import { useEffect } from 'react';

export default function CustomSignUp() {
    const { isLoaded, signUp } = useSignUp();

    useEffect(() => {
        if (!isLoaded) return;

        const createDjangoUser = async () => {
            if (signUp.status === 'complete' && signUp.createdUserId) {
                try {
                    await createUserInDjango(signUp.createdUserId);
                    console.log('User created in Django successfully');
                } catch (error) {
                    console.error('Failed to create user in Django:', error);
                    // You might want to handle this error, perhaps by showing a message to the user
                }
            }
        };

        createDjangoUser();
    }, [isLoaded, signUp]);

    return <SignUp />;
}