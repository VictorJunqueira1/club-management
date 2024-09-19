import { getDB } from '../config/config';
import { ObjectId } from 'mongodb';

interface User {
  _id: ObjectId;
  email: string;
  password: string;
  role: 'director' | 'user';
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const db = getDB();
  return await db.collection('users').findOne({ email });
};

export const isDirector = (user: User): boolean => {
  return user.role === 'director';
};

export const createUser = async (email: string, password: string, role: 'director' | 'user') => {
  const db = getDB();
  await db.collection('users').insertOne({ email, password, role });
};
