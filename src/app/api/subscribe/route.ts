import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('subscribers'); // Name of your collection

    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 409 });
    }

    // Insert the new subscriber
    await collection.insertOne({ email, subscribedAt: new Date() });

    return NextResponse.json({ message: 'Subscription successful' }, { status: 201 });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
