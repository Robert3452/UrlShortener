import { Router } from 'express';
import { shortUrl, getUrl } from '../services/short.services'

const router = Router();

router.post('/', shortUrl);
router.get('/:id', getUrl);

export default router;