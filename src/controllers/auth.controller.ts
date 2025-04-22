import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { IUser } from '../types/user';
import { v4 as uuidv4 } from 'uuid';

export async function register(req: Request, res: Response) {
  const { email, password, role } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({id: uuidv4(), email, password: hashed, role });

    res.status(201).json({ message: 'User registered', email: newUser.getDataValue('email') });
  } catch (err) {
    res.status(500).json({ message: 'Register error', error: err });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const plainUser = user.toJSON() as IUser;
    
    const match = await bcrypt.compare(password, plainUser.password);

    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: plainUser.id, role: plainUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err });
  }
}
