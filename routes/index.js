import express from 'express';

import { getStatus, getStats } from '../controllers/AppController';
import { postNew } from '../controllers/UsersController';
import { getConnect, getDisconnect } from '../controllers/AuthController';
import { getMe } from '../controllers/UserController';

const router = express.Router();

router.get('/status', getStatus);
router.get('/stats', getStats);
router.post('/users', postNew);
router.get('/connect', getConnect);
router.get('/disconnect', getDisconnect);
router.get('users/:me', getMe);

export default router;
