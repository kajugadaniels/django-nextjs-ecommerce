// utils/user.ts
import { get, put } from './api';
import { User } from './types';

export async function getUser(clerkId: string): Promise<User | null> {
    try {
        const response = await get(`/api/users/${clerkId}`);
        return response.data as User;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}

export async function createOrUpdateUser(
    clerkId: string,
    userData: Partial<User>
): Promise<User> {
    try {
        const response = await put(`/api/users/${clerkId}`, userData);
        return response.data as User;
    } catch (error) {
        console.error('Error creating/updating user:', error);
        throw error;
    }
}