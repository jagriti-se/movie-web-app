import { Router } from 'express';
import {
  trending,
  popular,
  topRated,
  upcoming,
  search,
  details,
  similar,
} from '../controllers/movieController.js';

const router = Router();

router.get('/trending', trending);
router.get('/popular', popular);
router.get('/top-rated', topRated);
router.get('/upcoming', upcoming);
router.get('/search', search);
router.get('/:id', details);
router.get('/:id/similar', similar);

export default router;
