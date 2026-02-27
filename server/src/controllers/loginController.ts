import { Request, Response } from 'express';
import prisma from '../db/prisma';

export const login = async (req: Request<{}, {}, { username: string; password: string }>, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Return a JSON response instead of a redirect
    return res.json({ message: 'Login successful', redirect: '/dashboard' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};