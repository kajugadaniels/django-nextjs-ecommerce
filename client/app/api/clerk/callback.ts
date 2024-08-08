import type { NextApiRequest, NextApiResponse } from 'next';
import { ClerkApiAuth } from '@clerk/nextjs/api';
import { createUser, getUser, updateUser } from '@/app/utils/user';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // Verify the Clerk callback
        await ClerkApiAuth.handleCallback(req);

        // Get the user data from the callback
        const userData = req.body.user;

        // Check if the user already exists in the database
        const user = await getUser(userData.id);

        if (user) {
            // Update the existing user
            await updateUser(userData.id, {
                email: userData.email,
                first_name: userData.firstName,
                last_name: userData.lastName,
            });
        } else {
            // Create a new user
            await createUser({
                clerk_id: userData.id,
                email: userData.email,
                first_name: userData.firstName,
                last_name: userData.lastName,
            });
        }

        res.status(200).json({ message: 'User synchronized successfully' });
    } catch (error) {
        console.error('Error syncing user:', error);
        res.status(500).json({ error: 'Error syncing user' });
    }
}