import { Request, Response } from 'express';
import * as AnswersService from './answers.service';


export const create = async (req: Request, res: Response) => {


  try {
    const { body } = req;
    const answersIds: Array<string> = Object.values(body);
   
    const { tokenPayload: { id: userId } } = res.locals;
    
    const queryResult = await AnswersService.create(userId, answersIds);
    
    
    res.status(200).json({ questions: queryResult });

  } catch (error) {
    res.status(400).json({ error });
  }

}

