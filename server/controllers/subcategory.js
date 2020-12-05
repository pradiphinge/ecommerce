/** @format */

import SubCategory from '../models/SubCategory.js';
import slugify from 'slugify';

export const create = async (req, res) => {
	try {
		const { name, parent } = req.body;
		console.log(name);
		const subcategory = await new SubCategory({
			name,
			parent,
			slug: slugify(name),
		}).save();
		if (subcategory) res.status(201).json(subcategory);
		else {
			res.status(400).send('Error creating subcategory');
		}
	} catch (err) {
		console.log('err creating subcategory-->', err);
		err && err.name && console.log(err.name);
		if (err.code === 11000) res.status(400).send('SubCategory already exists');
		else if (err.name === 'ValidationError')
			res.status(400).send('Please Provide all required fields');
		else res.status(500).send('Server Error');
	}
};
export const read = async (req, res) => {
	try {
		const subCategory = await SubCategory.findOne({
			slug: req.params.slug,
		}).exec();
		res.status(200).json(subCategory);
	} catch (err) {
		console.log('Reading subcategories error : ', err);
		res.status(500).send('Server Error');
	}
};

export const update = async (req, res) => {
	const { name, parent } = req.body;
	try {
		const updated = await SubCategory.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, parent, slug: slugify(name) },
			{ new: true }
		);
		if (updated) {
			res.status(200).json(updated);
		} else {
			res.status(400).send('Error in updating subcategory');
		}
	} catch (err) {
		console.log(err);
		res.status(500).send('Server Error');
	}
};

export const remove = async (req, res) => {
	try {
		const deleted = await SubCategory.findOneAndDelete({
			slug: req.params.slug,
		}).exec();
		res.status(200).json(deleted);
	} catch (err) {
		console.log('err deleting subcategory -->', err);
		res.status(500).send('Server Error');
	}
};

export const list = async (req, res) => {
	try {
		const subcategoryList = await SubCategory.find({})
			.sort({ createdAt: -1 })
			.exec();
		res.status(200).json(subcategoryList);
	} catch (err) {
		console.log('Error sending list', err);
		res.status(500).send('Server Error');
	}
};
