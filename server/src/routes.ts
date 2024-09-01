import { Router } from 'express';
import { findUserByUsername, isDirector } from './user';
import { generateToken, comparePassword, verifyToken } from './auth';
import { ObjectId } from 'mongodb';
import { getDB } from './config/config';

const router = Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const passwordMatches = await comparePassword(password, user.password);
  if (!passwordMatches) {
    return res.status(401).send('Invalid credentials');
  }

  const token = generateToken(user);
  res.send({ token });
});

// Task creation route
router.post('/tasks', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).send('Token is required');
  }

  try {
    const decoded: any = verifyToken(token);
    if (decoded && isDirector(decoded)) {
      const db = getDB();
      const { title, description } = req.body;
      const task = { title, description, createdBy: new ObjectId(decoded.id) };
      
      await db.collection('tasks').insertOne(task);
      res.send('Task created successfully');
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (err:any) {
    res.status(403).send(err.message);
  }
});

export default router;
