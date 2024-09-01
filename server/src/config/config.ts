import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'directorAccessDB';
let db: any;

export const connectDB = async () => {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  console.log('Connected to MongoDB');
};

export const getDB = () => {
  if (!db) {
    throw new Error('No database found');
  }
  return db;
};
