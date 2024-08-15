import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const userData = await req.json();
        console.log('Received user data in sync-user API:', userData);

        const djangoApiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log('Django API URL:', djangoApiUrl);

        const response = await fetch(`${djangoApiUrl}/auth/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clerk_id: userData.clerkUserId,
                email: userData.email,
                first_name: userData.firstName,
                last_name: userData.lastName,
            }),
        });

        console.log('Django API response status:', response.status);
        const responseData = await response.json();
        console.log('Django API response data:', responseData);

        if (!response.ok) {
            throw new Error(`Failed to sync user with Django: ${response.statusText}`);
        }

        return NextResponse.json({ message: 'User synced successfully', user: responseData });
    } catch (error) {
        console.error('Error in sync-user API:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: 'Failed to sync user', details: errorMessage }, { status: 500 });
    }
}