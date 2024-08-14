import { buffer } from 'micro';
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
        // Convert headers to Record<string, string>
        const headersList = Array.from(req.headers.entries());
        const headersRecord: Record<string, string> = {};
        headersList.forEach(([key, value]) => {
            headersRecord[key] = value;
        });

        payload = webhook.verify(
            rawBody,
            headersRecord
        );
    } catch (err) {
        console.error('Invalid webhook payload:', err);
        return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }

    // Forward the webhook to your Django backend
    const response = await fetch('https://ecommerce-api-pro.up.railway.app/api/clerk-webhook/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        console.error('Failed to forward webhook:', await response.text());
        return NextResponse.json({ error: 'Failed to forward webhook' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Webhook processed successfully' });
}