import { Router } from 'express';
import { list, add, remove } from '../controllers/wishlistController.js';

const router = Router();

router.get('/', list);
router.post('/', add);
router.delete('/:movieId', remove);

export default router;
