import { Request, Response } from 'express';
import * as QuestionsService from './questions.service';


export const getAll = async (req: Request, res: Response) => {

  try {
    
    const queryResult = await QuestionsService.getAll();
    
    
    res.status(200).json({ questions: queryResult });

  } catch (error) {
    res.status(400).json({ error });
  }

}

