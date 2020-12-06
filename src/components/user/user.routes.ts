import { Router } from 'express';
import { checkToken } from '../../middlewares/checkToken';
import * as UserController from './user.controller';

const router = Router();

router.post('/', UserController.create);
router.get('/infos', checkToken, UserController.getInfos);


export default router;
