import { Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import * as AuthService from './auth.service';
import { LoginSchema } from './auth.schema';

interface Body {
  email: string
  password: string
}

export const login = async (req: Request, res: Response): Promise<void> => {

  try {
    const body: Body = req.body;
    const { email, password } = body;

    await LoginSchema.validateAsync(req.body, { abortEarly: false });

    const { id, name, password: dbPassword, answered } = await AuthService.login(email);
    const match = await bcrypt.compare(password, dbPassword);

    if(!match) throw Error('User and/or password is not correct');

    const secret: string = process.env.JWT_SECRET as string;
    const token = await jwt.sign({ id, name, email, answered }, secret, { expiresIn: '7d' });
    res.status(200).json({ token });

  } catch (error) {
    res.status(401).json({ error: error.message});
  }

}

export const verify = async (req: Request, res: Response): Promise<void> => {

  try {
    let authHeader = <string>req.headers.authorization;
    const token: string = authHeader.startsWith('Bearer') ? authHeader.substring(7) : authHeader;
    jwt.verify(token, <string>process.env.JWT_SECRET);
    res.status(200).json({ isValid: true });
  } catch (error) {
    res.status(200).json({ isValid: false });
  }

}
