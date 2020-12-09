/** @format */

import express from 'express';
import { create, list } from '../controllers/product.js';
import { adminCheck, authCheck } from '../middlewares/auth.js';

const router = express.Router();

router.get('/products', list);

router.route('/product').post(authCheck, adminCheck, create);

// router
// 	.route('/category/:slug')
// 	.get(read)
// 	.delete(authCheck, adminCheck, remove)
// 	.put(authCheck, adminCheck, update);

export default router;
