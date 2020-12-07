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

export const getAll = async (req: Request, res: Response) => {


  try {
    
    const queryResult = await AnswersService.getAll();
    const groupedByQuestion = queryResult.reduce((acc, curr) => {
      const { questionId, question, option, quantidade, chartProps } = curr;
      acc[questionId] = acc[questionId] 
      ? { 
        ...acc[questionId], 
        data: [
          ...acc[questionId].data, 
          { answer: option, quantidade } 
        ] 
      } 
      : { 
        title: question,
        chartProps,
        data: [
          { answer: option, quantidade }
        ] 
      }
      return acc;
    }, {});

    res.status(200).json({...groupedByQuestion});

  } catch (error) {
    console.log(error)
    res.status(400).json({ error });
  }

}

