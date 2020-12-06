import { Router } from 'express';
import * as QuestionsController from './questions.controller';
import { checkToken } from "../../middlewares/checkToken";

const router = Router();

router.get('/', checkToken, QuestionsController.getAll);


export default router;
