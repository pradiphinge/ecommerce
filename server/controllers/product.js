/** @format */

import slugify from 'slugify';

import Product from '../models/Product.js';

export const list = async (req, res) => {
	const products = await Product.find()
		.limit(parseInt(req.params.count))
		.populate('category')
		.populate('subcategories')
		.sort({ createdAt: -1 })
		.exec();

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
			res.status(400).json({ err: 'create product failed.' });
		}
	}
};

export const remove = async (req, res) => {
	try {
		const deleted = await Product.findOneAndDelete({ slug: req.params.slug });
		console.log(deleted);
		res.json(deleted);
	} catch (err) {
		console.log(err);
		return res.status(400).send('Product deletion failed');
	}
};

export const read = async (req, res) => {
	const product = await Product.findOne({ slug: req.params.slug })
		.populate('category')
		.populate('subcategories')
		.exec();

	res.status(200).json(product);
};
export const update = async (req, res) => {
	try {
		if (req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		const product = await Product.findOneAndUpdate(
			{ slug: req.params.slug },
			req.body,
			{ new: true }
		).exec();
		res.json(product);
	} catch (err) {
		console.log('Update Failed ==>', err);
		res.status(400).json({ err: err.message });
	}
};

// export const listHome = async (req, res) => {
// 	const { sort, order, limit } = req.body;
// 	const products = await Product.find()
// 		.populate('category')
// 		.populate('subcategories')
// 		.sort([[sort, order]])
// 		.limit(limit)
// 		.exec();

// 	res.status(200).json(products);
// };

export const listHome = async (req, res) => {
	const { sort, order, page } = req.body;
	const currentPage = page || 1;
	const perPage = 3;
	const products = await Product.find()
		.skip((currentPage - 1) * perPage)
		.populate('category')
		.populate('subcategories')
		.sort([[sort, order]])
		.limit(perPage)
		.exec();

	res.status(200).json(products);
};

export const productsCount = async (req, res) => {
	const total = await Product.find({}).estimatedDocumentCount().exec();
	res.json(total);
};

export const productStar = async (req, res) => {
	const product = await Product.findOne({ _id: req.params.productId }).exec();
	const user = await User.findOne({ email: req.user.email }).exec();
	const { star } = req.body;

	//check if user has already rated product
	let existingRatingObject = product.ratings.find(
		(el) => el.postedBy.toString() === user._id.toString()
	);
	//existingRatingObject ===undefined ? add : update
	if (!existingRatingObject) {
		let ratingAdded = await Product.findByIdAndUpdate(
			product._id,
			{
				$push: { ratings: { star, postedBy: user._id } },
			},
			{ new: true }
		).exec();
		console.log('ratingAdded', ratingAdded);
		res.json(ratingAdded);
	} else {
		const ratingUpdated = await Product.updateOne(
			{
				ratings: { $elemMatch: existingRatingObject },
			},
			{ $set: { 'ratings.$.star': star } },
			{ new: true }
		).exec();
		console.log('ratingUpdated', ratingUpdated);
		res.json(ratingUpdated);
	}
};
