import { IncomingHttpHeaders } from 'http';
import { NextResponse } from 'next/server';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { headers } from 'next/headers';

const webhookSecret: string = process.env.WEBHOOK_SECRET || '';

async function handler(req: Request) {
    const payload = await req.text();
    const headersList = headers();
    const heads = {
        "svix-id": headersList.get("svix-id"),
        "svix-timestamp": headersList.get("svix-timestamp"),
        "svix-signature": headersList.get("svix-signature"),
    };

    const wh = new Webhook(webhookSecret);
    let event: any;

    try {
        event = wh.verify(payload, heads as IncomingHttpHeaders & WebhookRequiredHeaders);
    } catch (err) {
        console.error((err as Error).message);
        return NextResponse.json({ message: 'Webhook verification failed' }, { status: 400 });
    }

    const { id, email_addresses, image_url, first_name, last_name, created_at } = event.data;

    // Handle user creation
    if (event.type === 'user.created') {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clerkId: id,
                email: email_addresses[0].email_address,
                firstName: first_name,
                lastName: last_name,
                avatar: image_url,
                createdAt: created_at,
            }),
        });

        if (!response.ok) {
            console.error('Failed to create user in backend');
            return NextResponse.json({ message: 'Failed to create user in backend' }, { status: 500 });
        }
    }

    // Handle user update
    if (event.type === 'user.updated') {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email_addresses[0].email_address,
                firstName: first_name,
                lastName: last_name,
                avatar: image_url,
            }),
        });

        if (!response.ok) {
            console.error('Failed to update user in backend');
            return NextResponse.json({ message: 'Failed to update user in backend' }, { status: 500 });
        }
    }

    // Handle user deletion
    if (event.type === 'user.deleted') {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            console.error('Failed to delete user in backend');
            return NextResponse.json({ message: 'Failed to delete user in backend' }, { status: 500 });
        }
    }

    return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 });
}

export { handler as POST };