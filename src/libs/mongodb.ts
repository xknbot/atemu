import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'atemu_newsletter'; // Or whatever you want to name your database

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri!);

  try {
    await client.connect();
    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}
