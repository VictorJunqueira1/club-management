import { Router } from 'express';
import { findUserByEmail, isDirector } from './models/user';
import { generateToken, comparePassword, verifyToken, hashPassword } from './auth'; // Adicione hashPassword aqui
import { ObjectId } from 'mongodb';
import { getDB } from './config/config';
import cors from 'cors';

const router = Router();

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

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

// Rota de criação de tarefas
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
  } catch (err: any) {
    res.status(403).send(err.message);
  }
});

router.post('/userRole', async (req, res) => {
  // Verifica se o nome de usuário foi passado no corpo da requisição
  const { email } = req.body;
  console.log(`email recebido: ${email}`)
  if (!email) {
    return res.status(400).send('email is required');
  }

  try {
    // Conexão com o banco de dados
    const db = getDB();

    // Busca o usuário pelo nome de usuário no banco de dados
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Retorna o papel do usuário
    res.send({ role: user.role });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// Rota de criação de usuários
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  // Verifica se o usuário já existe
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // Gera o hash da senha
  const hashedPassword = await hashPassword(password);

  const db = getDB();
  const newUser = {
    email,
    password: hashedPassword,
    role, // Você pode definir um papel padrão aqui, se desejar
  };

  await db.collection('users').insertOne(newUser);
  res.status(201).send('User created successfully');
});

// Rota para salvar os dados da unidade
router.post('/unidades', async (req, res) => {
  const { nomeUnidade, idade, genero, responsavel, conselheiros, auxiliares } = req.body;

  const db = getDB();
  const novaUnidade = {
    nomeUnidade,
    idade,
    genero,
    responsavel,
    conselheiros: conselheiros ? conselheiros.map((conselheiro: string) => conselheiro.split(",")) : [],
    auxiliares: auxiliares ?  auxiliares.map((auxiliar: string) => auxiliar.split(",")) : []
  };

  try {
    await db.collection('unidades').insertOne(novaUnidade);
    res.status(201).send('Unidade criada com sucesso');
  } catch (err: any) {
    res.status(500).send('Erro ao salvar a unidade');
  }
});

// Rota para buscar todas as unidades
router.get('/unidades', async (req, res) => {
  const db = getDB();

  try {
    const unidades = await db.collection('unidades').find().toArray();
    res.status(200).json(unidades);
  } catch (err: any) {
    res.status(500).send('Erro ao buscar unidades');
  }
});


export default router;
