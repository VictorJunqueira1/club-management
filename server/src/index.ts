import express from 'express';
import router from './routes';
import { connectDB } from './config/config';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:3001', // Permita requisições deste domínio
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err: any) => {
  console.error('Failed to connect to the database', err);
});
