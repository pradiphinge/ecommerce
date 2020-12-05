/** @format */

import express from 'express';
import { create, read, update, remove, list } from '../controllers/category.js';
import { adminCheck, authCheck } from '../middlewares/auth.js';

const router = express.Router();

router.get('/categories', list);

router.route('/category').post(authCheck, adminCheck, create);

router
	.route('/category/:slug')
	.get(read)
	.delete(authCheck, adminCheck, remove)
	.put(authCheck, adminCheck, update);

export default router;
