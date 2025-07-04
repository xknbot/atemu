/**
 * MongoDB connection utility with enhanced features
 */

import { MongoClient, Db, MongoClientOptions } from 'mongodb';

// MongoDB configuration
const MONGODB_CONFIG = {
  URI: process.env.MONGODB_URI,
  DB_NAME: process.env.MONGODB_DB_NAME || 'atemu_game',
  OPTIONS: {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
  } as MongoClientOptions,
};

if (!MONGODB_CONFIG.URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global variables for connection caching
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

/**
 * Connect to MongoDB with connection pooling and caching
 */
export async function connectToDatabase() {
  // Return cached connection if available
  if (cachedClient && cachedDb) {
    try {
      // Test the connection
      await cachedClient.db('admin').admin().ping();
      return { client: cachedClient, db: cachedDb };
    } catch (error) {
      console.warn('Cached MongoDB connection is stale, reconnecting...');
      cachedClient = null;
      cachedDb = null;
    }
  }

  try {
    console.log('Connecting to MongoDB...');
    
    // Create new client with options
    const client = new MongoClient(MONGODB_CONFIG.URI!, MONGODB_CONFIG.OPTIONS);
    
    // Connect to MongoDB
    await client.connect();
    
    // Get database
    const db = client.db(MONGODB_CONFIG.DB_NAME);
    
    // Test connection
    await db.admin().ping();
    
    // Cache the connection
    cachedClient = client;
    cachedDb = db;
    
    console.log('Successfully connected to MongoDB');
    
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error(`MongoDB connection failed: ${error}`);
  }
}

/**
 * Close MongoDB connection
 */
export async function disconnectFromDatabase() {
  if (cachedClient) {
    try {
      await cachedClient.close();
      cachedClient = null;
      cachedDb = null;
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }
}

/**
 * Get database instance
 */
export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

/**
 * Collection helper class for type-safe operations
 */
export class Collection<T = any> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getCollection() {
    const db = await getDatabase();
    return db.collection<T>(this.collectionName);
  }

  async findOne(filter: any) {
    const collection = await this.getCollection();
    return collection.findOne(filter);
  }

  async findMany(filter: any = {}, options: any = {}) {
    const collection = await this.getCollection();
    return collection.find(filter, options).toArray();
  }

  async insertOne(document: Omit<T, '_id'>) {
    const collection = await this.getCollection();
    return collection.insertOne(document as any);
  }

  async insertMany(documents: Omit<T, '_id'>[]) {
    const collection = await this.getCollection();
    return collection.insertMany(documents as any[]);
  }

  async updateOne(filter: any, update: any, options: any = {}) {
    const collection = await this.getCollection();
    return collection.updateOne(filter, update, options);
  }

  async updateMany(filter: any, update: any, options: any = {}) {
    const collection = await this.getCollection();
    return collection.updateMany(filter, update, options);
  }

  async deleteOne(filter: any) {
    const collection = await this.getCollection();
    return collection.deleteOne(filter);
  }

  async deleteMany(filter: any) {
    const collection = await this.getCollection();
    return collection.deleteMany(filter);
  }

  async countDocuments(filter: any = {}) {
    const collection = await this.getCollection();
    return collection.countDocuments(filter);
  }

  async createIndex(indexSpec: any, options: any = {}) {
    const collection = await this.getCollection();
    return collection.createIndex(indexSpec, options);
  }
}

// Predefined collections with types
export interface UserDocument {
  _id?: string;
  walletAddress: string;
  username?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
  profile: {
    avatar?: string;
    bio?: string;
    level: number;
    experience: number;
  };
  preferences: {
    soundEnabled: boolean;
    theme: 'light' | 'dark';
    language: string;
  };
}

export interface CardDocument {
  _id?: string;
  cardId: string;
  name: string;
  rarity: string;
  faction: string;
  type: string;
  cost: number;
  attack?: number;
  health?: number;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

export interface GameSessionDocument {
  _id?: string;
  sessionId: string;
  mode: 'blitz' | 'fuel' | 'spin-of-fate';
  players: string[];
  status: 'waiting' | 'active' | 'completed' | 'cancelled';
  startTime?: Date;
  endTime?: Date;
  result?: any;
  createdAt: Date;
}

export interface NewsletterDocument {
  _id?: string;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
  preferences: {
    gameUpdates: boolean;
    promotions: boolean;
    newsletter: boolean;
  };
}

// Collection instances
export const collections = {
  users: new Collection<UserDocument>('users'),
  cards: new Collection<CardDocument>('cards'),
  gameSessions: new Collection<GameSessionDocument>('game_sessions'),
  newsletter: new Collection<NewsletterDocument>('newsletter'),
};

// Database initialization
export async function initializeDatabase() {
  try {
    const db = await getDatabase();
    
    // Create indexes for better performance
    await Promise.all([
      collections.users.createIndex({ walletAddress: 1 }, { unique: true }),
      collections.users.createIndex({ email: 1 }, { unique: true, sparse: true }),
      collections.cards.createIndex({ cardId: 1 }, { unique: true }),
      collections.cards.createIndex({ rarity: 1, faction: 1 }),
      collections.gameSessions.createIndex({ sessionId: 1 }, { unique: true }),
      collections.gameSessions.createIndex({ players: 1 }),
      collections.newsletter.createIndex({ email: 1 }, { unique: true }),
    ]);
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Health check function
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const db = await getDatabase();
    await db.admin().ping();
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

// Export database configuration
export { MONGODB_CONFIG };