import { Webhook, WebhookRequiredHeaders } from 'svix';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    const payload = await req.json();
    const headersList = headers();
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('CLERK_WEBHOOK_SECRET is not set');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Create an object from the headers
    const svixHeaders = {
        'svix-id': headersList.get('svix-id'),
        'svix-timestamp': headersList.get('svix-timestamp'),
        'svix-signature': headersList.get('svix-signature'),
    };

    // Verify the webhook
    const wh = new Webhook(webhookSecret);
    let evt: any;

    try {
        evt = wh.verify(JSON.stringify(payload), svixHeaders as WebhookRequiredHeaders);
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }

    // Process the webhook payload
    try {
        const { type, data } = evt;
        console.log('Webhook type:', type);
        console.log('Webhook data:', JSON.stringify(data, null, 2));

        // Handle different event types
        switch (type) {
            case 'user.created':
                // Handle user creation
                break;
            case 'user.updated':
                // Handle user update
                break;
            case 'user.deleted':
                // Handle user deletion
                break;
            // Add more cases as needed
        }

        return NextResponse.json({ message: 'Webhook processed successfully' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ error: 'Error processing webhook', details: (error as Error).message }, { status: 500 });
    }
}