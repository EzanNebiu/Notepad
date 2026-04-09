import { Router } from 'express';
import {
  createNote,
  getNote,
  updateNote,
  unlockNote,
  setPassword,
  removePassword,
  changeSlug,
  getShareInfo,
} from '../controllers/noteController';
import {
  validateSlug,
  validateCreateNote,
  validateUpdateNote,
  validatePassword,
  validateChangeSlug,
} from '../validators/noteValidators';

const router = Router();

router.post('/notes', validateCreateNote, createNote);
router.get('/notes/:slug', validateSlug, getNote);
router.patch('/notes/:slug', validateSlug, validateUpdateNote, updateNote);
router.post('/notes/:slug/unlock', validateSlug, validatePassword, unlockNote);
router.post('/notes/:slug/password', validateSlug, validatePassword, setPassword);
router.delete('/notes/:slug/password', validateSlug, removePassword);
router.post('/notes/:slug/change-slug', validateSlug, validateChangeSlug, changeSlug);
router.get('/notes/:slug/share', validateSlug, getShareInfo);

export default router;
