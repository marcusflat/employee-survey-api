import { Router } from 'express';
import * as AnswersController from './answers.controller';
import { checkToken } from "../../middlewares/checkToken";

const router = Router();

router.get('/', checkToken, AnswersController.getAll);
router.post('/', checkToken, AnswersController.create);


export default router;
