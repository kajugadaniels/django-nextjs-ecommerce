import crypto from 'crypto';

export class MomoApi {
    static async collectMoney(phone: string, amount: string) {
        const password = process.env.NEXT_PUBLIC_PAYMENT_PASSWORD;
        const username = process.env.NEXT_PUBLIC_PAYMENT_USERNAME;
        const timestamp = '20200131115242'; // You might want to generate this dynamically

        if (!password || !username) {
            throw new Error('Payment credentials are not set');
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const tran = Math.floor(Math.random() * (80000000000 - 19000 + 1) + 19000);

        const data = {
            username: username,
            timestamp: timestamp,
            amount: amount,
            password: hashedPassword,
            mobilephone: phone,
            requesttransactionid: tran.toString(),
            callbackurl: 'https://api.hellomed.rw/api/pay-webhook' // Make sure this is correct
        };

        const response = await fetch('https://www.intouchpay.co.rw/api/requestpayment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Payment request failed');
        }

        return await response.json();
    }
}