import { Webhook } from 'svix';
import { NextResponse } from 'next/server';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    const rawBody = await req.text();
    const secret = process.env.CLERK_WEBHOOK_SECRET;

    if (!secret) {
        console.error('CLERK_WEBHOOK_SECRET is not set');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const webhook = new Webhook(secret);
    let payload;

    try {
        const headersList = Array.from(req.headers.entries());
        const headersRecord: Record<string, string> = {};
        headersList.forEach(([key, value]) => {
            headersRecord[key] = value;
        });

        payload = webhook.verify(rawBody, headersRecord);
        console.log('Webhook payload:', JSON.stringify(payload, null, 2));
    } catch (err) {
        console.error('Invalid webhook payload:', err);
        return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }

    // Forward the webhook to your Django backend
    try {
        const response = await fetch('https://ecommerce-api-pro.up.railway.app/api/clerk-webhook/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to forward webhook. Status:', response.status, 'Error:', errorText);
            return NextResponse.json({ error: 'Failed to forward webhook', details: errorText }, { status: 500 });
        }

        const responseData = await response.json();
        console.log('Django response:', responseData);
        return NextResponse.json({ message: 'Webhook processed successfully', data: responseData });
    } catch (error) {
        console.error('Error forwarding webhook:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json({ error: 'Error forwarding webhook', details: errorMessage }, { status: 500 });
    }
}