/** @format */

import express from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.js';
import categoryRouter from './routes/category.js';
import subCategoryRouter from './routes/subcategory.js';
import productRouter from './routes/product.js';
import imageRouter from './routes/cloudinary.js';
dotEnv.config();

const app = express();

//connect Database
connectDB();
//Init middlewares
app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.json({ limit: '5mb' }));

//routes
//API Home
app.get('/', (req, res) => {
	res.json({
		data: 'Ecommerce API',
	});
});
// Define routes
app.use('/api/v1', authRouter);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', subCategoryRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', imageRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server started on PORT', PORT));
