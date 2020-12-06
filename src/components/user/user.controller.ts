import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { CreateSchema } from './user.schema';
import * as UserService from './user.service';

const saltRounds = 10;

export const create = async (req: Request, res: Response) => {

  const { name, email, password } = req.body;

  try {
    await CreateSchema.validateAsync(req.body, { abortEarly: false });
    
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const queryResult = await UserService.create(name, email, passwordHash);
    const { userId } = queryResult;
    
    res.status(201).json({ message: 'User has been created', id: userId });

  } catch (error) {
    res.status(400).json({ error });
  }

}

export const getInfos = async(req: Request, res: Response) => {

  try {

    const { tokenPayload: { id: userId } } = res.locals;


    const infos = await UserService.getInfos(userId);

    res.status(200).json(infos);
    
  } catch (error) {
    
  }

}

