/** @format */

import Category from '../models/Category.js';
import slugify from 'slugify';

export const create = async (req, res) => {
	try {
		const { name } = req.body;
		console.log(name);
		const category = await new Category({ name, slug: slugify(name) }).save();
		if (category) res.status(201).json(category);
		else {
			res.status(400).send('Error creating category');
		}
	} catch (err) {
		console.log('err creating category-->', err);
		err && err.name && console.log(err.name);
		if (err.code === 11000) res.status(400).send('Category already exists');
		else res.status(500).send('Server Error');
	}
};
export const read = async (req, res) => {
	try {
		const category = await Category.findOne({ slug: req.params.slug }).exec();
		res.status(200).json(category);
	} catch (err) {
		console.log('Reading categories error : ', err);
		res.status(500).send('Server Error');
	}
};

export const update = async (req, res) => {
	const { name } = req.body;
	try {
		const updated = await Category.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, slug: slugify(name) },
			{ new: true }
		);
		if (updated) {
			res.status(200).json(updated);
		} else {
			res.status(400).send('Error in updating category');
		}
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
};

export const remove = async (req, res) => {
	try {
		const deleted = await Category.findOneAndDelete({
			slug: req.params.slug,
		}).exec();
		res.status(200).json(deleted);
	} catch (err) {
		console.log('err deleting category -->', err);
		res.status(500).send('Server Error');
	}
};

export const list = async (req, res) => {
	try {
		const categoryList = await Category.find({}).sort({ createdAt: -1 }).exec();
		res.status(200).json(categoryList);
	} catch (err) {
		console.log('Error sending list', err);
		res.status(500).send('Server Error');
	}
};
