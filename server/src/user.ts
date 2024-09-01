import { getDB } from './config/config';
import { ObjectId } from 'mongodb';

interface User {
  _id: ObjectId;
  username: string;
  password: string;
  role: 'director' | 'user';
}

export const findUserByUsername = async (username: string): Promise<User | null> => {
  const db = getDB();
  return await db.collection('users').findOne({ username });
};

export const isDirector = (user: User): boolean => {
  return user.role === 'director';
};

export const createUser = async (username: string, password: string, role: 'director' | 'user') => {
  const db = getDB();
  await db.collection('users').insertOne({ username, password, role });
};
