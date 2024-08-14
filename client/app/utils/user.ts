import { get, post, put } from './api';
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

export async function createUser(userData: Partial<User>): Promise<User> {
    try {
        const response = await post(`/api/users/`, userData);
        return response.data as User;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function updateUser(clerkId: string, userData: Partial<User>): Promise<User> {
    try {
        const response = await put(`/api/users/${clerkId}`, userData);
        return response.data as User;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}