/** @format */

import express from 'express';
import { adminCheck, authCheck } from '../middlewares/auth.js';
import { upload, remove } from '../controllers/cloudinary.js';
const router = express();

router.post('/images', authCheck, adminCheck, upload);
router.post('/image', authCheck, adminCheck, remove);

export default router;
