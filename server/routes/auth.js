/** @format */

import express from 'express';
import { createOrUpdateUser, getCurrentUser } from '../controllers/auth.js';
import { adminCheck, authCheck } from '../middlewares/auth.js';

const router = express.Router();

router.route('/auth').post(authCheck, createOrUpdateUser);
router.route('/auth/currentUser').post(authCheck, getCurrentUser);
router.route('/auth/admin').post(authCheck, adminCheck, getCurrentUser);

export default router;
