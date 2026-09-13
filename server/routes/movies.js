import { Router } from 'express';
import {
  trending,
  popular,
  topRated,
  upcoming,
  search,
  details,
  similar,
  discover,
} from '../controllers/movieController.js';

const router = Router();

router.get('/trending', trending);
router.get('/popular', popular);
router.get('/top-rated', topRated);
router.get('/upcoming', upcoming);
router.get('/search', search);
router.get('/discover', discover);
router.get('/:id', details);
router.get('/:id/similar', similar);

export default router;
