/** @format */

import express from 'express';
import { create, list, remove } from '../controllers/product.js';
import admin from '../firebase/index.js';
import { adminCheck, authCheck } from '../middlewares/auth.js';

const router = express.Router();

router.get('/products/:count', list);

router.route('/product').post(authCheck, adminCheck, create);

router.route('/product/:slug').delete(authCheck, adminCheck, remove);
// router
// 	.route('/category/:slug')
// 	.get(read)
// 	.delete(authCheck, adminCheck, remove)
// 	.put(authCheck, adminCheck, update);

export default router;
