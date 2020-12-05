/** @format */

import express from 'express';
import {
	create,
	read,
	update,
	remove,
	list,
} from '../controllers/subcategory.js';
import { adminCheck, authCheck } from '../middlewares/auth.js';

const router = express.Router();

router.get('/subcategories', list);

router.route('/subcategory').post(authCheck, adminCheck, create);

router
	.route('/subcategory/:slug')
	.get(read)
	.delete(authCheck, adminCheck, remove)
	.put(authCheck, adminCheck, update);

export default router;
