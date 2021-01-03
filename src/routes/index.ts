import { Router } from 'express';
import short from './short.routes';

const router = Router();

router.use('/', short);

export default router;