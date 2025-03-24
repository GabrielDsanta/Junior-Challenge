import { Request, Response } from 'express';
import { User } from '../models/user';
import { body, validationResult } from 'express-validator';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const validateSignUp = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('breed').isIn(['elf', 'dwarf', 'man', 'sauron']).withMessage('Invalid breed type'),
];

async function signUp(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, breed, password } = req.body;

    const userFound = await User.findOne({ where: { email: String(email).toLowerCase() } });
    if (userFound) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      breed,
      password: hashedPassword,
    });

    const token = getToken(user.id, user.email);

    return res.status(201).json({ user, token });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!(email || password)) {
      return res.status(400).json({ error: 'inputs not provided' });
    }

    const user = await User.findOne({ where: { email: String(email).toLowerCase() } });

    if (!user) {
      return res.status(400).json({ error: 'Email not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = getToken(user.id, user.email);

    return res.status(200).json({ user, token });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function checkJWT(req: any, res: Response) {
  const { user_id } = req;

  try {
    const user = await User.findOne({ where: { id: user_id } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export { signUp, signIn, checkJWT };

function getToken(user_id: string, email: string) {
  const ONE_DAY = 86400000;
  const tokenKey = process.env.TOKEN_KEY || 'secret';
  return jwt.sign({ user_id, email }, tokenKey, {
    expiresIn: ONE_DAY,
  });
}
