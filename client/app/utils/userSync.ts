import { getApiUrl } from "@/lib/apiConfig";

export async function createUserInDjango(userId: string) {
    const response = await fetch(`${getApiUrl()}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            clerk_id: userId,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to create user in Django');
    }

    return response.json();
}