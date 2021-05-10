/** @format */

import express from 'express';
import {
	create,
	list,
	remove,
	read,
	update,
	listHome,
	productsCount,
	productStar,
} from '../controllers/product.js';
import admin from '../firebase/index.js';
import { adminCheck, authCheck } from '../middlewares/auth.js';

const router = express.Router();

router.get('/products/:count', list);

router.route('/product').post(authCheck, adminCheck, create);

router.route('/product/:slug').delete(authCheck, adminCheck, remove);
router.route('/product/:slug').get(read).put(authCheck, adminCheck, update);

router.route('/products').post(listHome).get(productsCount);

router.route('/products/star/:productId').put(authCheck, productStar);
// router
// 	.route('/category/:slug')
// 	.get(read)
// 	.delete(authCheck, adminCheck, remove)
// 	.put(authCheck, adminCheck, update);

export default router;
