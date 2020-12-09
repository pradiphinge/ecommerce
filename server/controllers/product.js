/** @format */

import slugify from 'slugify';

import Product from '../models/Product.js';

export const list = async (req, res) => {
	const products = await Product.find().sort({ createdAt: -1 });
	res.status(200).json(products);
};

export const create = async (req, res) => {
	try {
		console.log('Product Controller request===>', req.body);
		req.body.slug = slugify(req.body.title);
		const newProduct = await new Product(req.body).save();
		res.status(201).json(newProduct);
	} catch (err) {
		console.log('Error creating product==>', err);
		console.log(err.name);
		if (err.name === 'ValidationError') {
			res.status(400).json({ err: 'Please provide all necessary fields.' });
		} else if (err.code === 11000) {
			res.status(400).json({ err: 'Product already exists' });
		} else {
			res.status(400).send('create product failed.');
		}
	}
};
